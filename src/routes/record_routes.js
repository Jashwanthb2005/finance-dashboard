const express = require("express");
const router = express.Router();

const recordController = require("../controllers/record_controller");
const { authorize } = require("../middlewares/auth_middleware");

router.post("/", authorize("create"), recordController.createRecord);
router.get("/", authorize("read"), recordController.getRecords);
router.put("/:id", authorize("update"), recordController.updateRecord);
router.delete("/:id", authorize("delete"), recordController.deleteRecord);

module.exports = router;