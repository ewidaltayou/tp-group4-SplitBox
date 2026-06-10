const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: [true, 'La dépense doit appartenir à un groupe'],
  },
  title: {
    type: String,
    required: [true, 'Le libellé de la dépense est obligatoire'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Le montant est obligatoire'],
    min: [0, 'Le montant ne peut pas être négatif'],
  },
  paidBy: {
    type: String,
    required: [true, 'Le payeur est obligatoire'],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});