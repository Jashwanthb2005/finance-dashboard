const mongoose = require("mongoose");
const userService = require("../services/user_service");
const { validateUser } = require("../utils/validation");

exports.createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID"
      });
    }
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {

    const status = error.message.includes("not found") ? 404 : 400;

    res.status(status).json({
      success: false,
      error: error.message
    });
  }
};