const Expense = require('../models/expense');
const Group = require('../models/group');

// POST /api/groups/:id/expenses — Ajouter une dépense à un groupe
const addExpense = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Groupe introuvable' });
    }

    const { title, amount, paidBy } = req.body;

    // Vérifier que le payeur est bien un membre du groupe
    if (!group.members.includes(paidBy)) {
      return res.status(400).json({
        message: `"${paidBy}" n'est pas un membre de ce groupe`,
      });
    }

    const expense = await Expense.create({
      groupId: req.params.id,
      title,
      amount,
      paidBy,
    });