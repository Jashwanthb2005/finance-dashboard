const recordService = require("../services/record_service");

exports.createRecord = async (req, res) => {
  try {
    const record = await recordService.createRecord(req.body);
    res.status(201).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(400).json({
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
    const record = await recordService.updateRecord(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    await recordService.deleteRecord(req.params.id);
    res.status(200).json({
      success: true,
      message: "Record deleted"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};