const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du groupe est obligatoire'],
    trim: true,
  },
  members: {
    type: [String],
    required: [true, 'Le groupe doit avoir au moins un membre'],
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'La liste des membres ne peut pas être vide',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Group', groupSchema);
