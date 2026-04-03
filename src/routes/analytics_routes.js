const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analytics_controller");
const { authorize } = require("../middlewares/auth_middleware");

router.get("/summary", authorize("analyze"), analyticsController.getSummary);
router.get("/categories", authorize("analyze"), analyticsController.getCategories);
router.get("/trends", authorize("analyze"), analyticsController.getTrends);
router.get("/recent", authorize("analyze"), analyticsController.getRecent);

module.exports = router;