import Group from "../models/Group.js";
import Expense from "../models/Expense.js";

export const getBalance = async (req, res) => {
  try {
    const groupId = req.params.id;

    // 1. Récupérer le groupe
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const members = group.members;

    // 2. Récupérer les dépenses du groupe
    const expenses = await Expense.find({ groupId });

    // 3. Calcul du total
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // 4. Part idéale
    const idealShare = members.length > 0 ? total / members.length : 0;

    // 5. Total payé par membre
    const paidByMember = {};

    members.forEach((m) => {
      paidByMember[m] = 0;
    });

    expenses.forEach((exp) => {
      if (paidByMember[exp.paidBy] !== undefined) {
        paidByMember[exp.paidBy] += exp.amount;
      }
    });

    // 6. Calcul des soldes
    const balances = members.map((member) => {
      const paid = paidByMember[member];
      const balance = paid - idealShare;

      return {
        member,
        paid,
        balance
      };
    });

    // 7. Réponse finale
    res.json({
      group: group.name,
      total,
      idealShare,
      balances
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};