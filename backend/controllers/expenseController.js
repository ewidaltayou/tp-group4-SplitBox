import Expense from "../models/Expense.js";
import Group from "../models/Group.js";

export const createExpense = async (req, res) => {
  try {
    const { title, amount, paidBy } = req.body;

    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        message: "Group not found"
      });
    }

    if (!group.members.includes(paidBy)) {
      return res.status(400).json({
        message: "Invalid member"
      });
    }

    const expense = await Expense.create({
      groupId: req.params.id,
      title,
      amount,
      paidBy
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      groupId: req.params.id
    }).sort({
      createdAt: -1
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};