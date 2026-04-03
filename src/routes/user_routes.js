const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");
const { authorize } = require("../middlewares/auth_middleware");

router.post("/", authorize("create"), userController.createUser);
router.get("/", authorize("read"), userController.getUsers);
router.put("/:id", authorize("update"), userController.updateUser);

module.exports = router;