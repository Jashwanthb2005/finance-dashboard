const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.put("/:id", userController.updateUser);
module.exports = router;