const analyticsService = require("../services/analytics_service");

exports.getSummary = async (req, res) => {
  try {
    const data = await analyticsService.getSummary();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const data = await analyticsService.getCategoryBreakdown();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getTrends = async (req, res) => {
  try {
    const data = await analyticsService.getMonthlyTrends();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getRecent = async (req, res) => {
  try {
    const data = await analyticsService.getRecentTransactions();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};