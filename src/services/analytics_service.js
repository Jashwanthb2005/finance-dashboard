const Record = require("../models/record_model");

exports.getSummary = async () => {
  const result = await Record.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0;
  let expense = 0;
  result.forEach(item => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense
  };
};

exports.getCategoryBreakdown = async () => {
  return await Record.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);
};

exports.getMonthlyTrends = async () => {

  return await Record.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" }
      }
    },
    {
      $sort: { "_id": 1 }
    }
  ]);
};
exports.getRecentTransactions = async () => {

  return await Record.find()
    .sort({ createdAt: -1 })
    .limit(5);
};