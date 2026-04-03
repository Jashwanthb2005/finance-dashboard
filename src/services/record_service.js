const Record = require("../models/record_model");

exports.createRecord = async (data) => {
  return await Record.create(data);
};

exports.getRecords = async (query) => {
  let filter = {};
  if (query.type) {
    filter.type = query.type;
  }
  if (query.category) {
    filter.category = query.category;
  }
  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate)
    };
  }
  return await Record.find(filter).sort({ date: -1 });
};

exports.updateRecord = async (id, data) => {
  const record = await Record.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
  if (!record) {
    throw new Error("Record not found");
  }
  return record;
};

exports.deleteRecord = async (id) => {
  const record = await Record.findByIdAndDelete(id);
  if (!record) {
    throw new Error("Record not found");
  }
  return record;
};