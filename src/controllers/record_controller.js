const mongoose = require("mongoose");
const recordService = require("../services/record_service");
const { validateRecord } = require("../utils/validation");

exports.createRecord = async (req, res) => {
  try {
    const { error } = validateRecord(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const record = await recordService.createRecord(req.body);

    res.status(201).json({
      success: true,
      data: record
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const records = await recordService.getRecords(req.query);

    res.status(200).json({
      success: true,
      data: records
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid record ID"
      });
    }
    const record = await recordService.updateRecord(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {

    const status = error.message.includes("not found") ? 404 : 400;

    res.status(status).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteRecord = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid record ID"
      });
    }

    await recordService.deleteRecord(req.params.id);
    res.status(200).json({
      success: true,
      message: "Record deleted"
    });
  } catch (error) {

    const status = error.message.includes("not found") ? 404 : 400;

    res.status(status).json({
      success: false,
      error: error.message
    });
  }
};