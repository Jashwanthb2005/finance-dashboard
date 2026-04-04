const mongoose = require("mongoose");
const Record = require("../models/record_model");

exports.createRecord = async (data) => {
  return await Record.create(data);
};

exports.getRecords = async (query) => {

  let filter = { isDeleted: false };

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate)
    };
  }
  if (query.search) {
    filter.$or = [
      { category: { $regex: query.search, $options: "i" } },
      { notes: { $regex: query.search, $options: "i" } }
    ];
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;
  const skip = (page - 1) * limit;

  const records = await Record.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Record.countDocuments(filter);

  return {
    total,
    page,
    limit,
    records
  };
};

exports.updateRecord = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid record ID");
  }

  const allowedFields = ["amount", "type", "category", "date", "notes"];
  const updateData = {};

  allowedFields.forEach(field => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  const record = await Record.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { returnDocument: "after" }
  );

  if (!record) {
    throw new Error("Record not found or already deleted");
  }

  return record;
};

exports.deleteRecord = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid record ID");
  }

  const record = await Record.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { returnDocument: "after" }
  );

  if (!record) {
    throw new Error("Record not found or already deleted");
  }

  return record;
};