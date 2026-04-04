const Record = require("../models/record_model");

exports.getSummary = async () => {
  const result = await Record.aggregate([
    { $match: { isDeleted: false } },
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
    { $match: { isDeleted: false } },
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
      $match: { isDeleted: false }
    },
    {
      $group: {
        _id: {
          month: { $month: {$toDate:"$date"} },
          type: "$type"
        },
        total: { $sum: "$amount" }
      }
    },
    {
      $group: {
        _id: "$_id.month",
        income: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0]
          }
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0]
          }
        }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);
};
exports.getRecentTransactions = async () => {
  return await Record.find()
    .sort({ createdAt: -1 })
    .limit(5);
};