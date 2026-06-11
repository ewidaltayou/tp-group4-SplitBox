const Group = require('../models/group');

// POST /api/groups — Créer un nouveau groupe
const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    // Vérification minimale avant d'aller en base
    if (!name || !members || members.length === 0) {
      return res.status(400).json({
        message: 'Le nom et au moins un membre sont requis',
      });
    }

    const group = await Group.create({ name, members });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/groups — Lister tous les groupes
const getAllGroups = async (req, res) => {
  try {
    // On trie du plus récent au plus ancien
    const groups = await Group.find().sort({ createdAt: -1 });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/groups/:id — Récupérer un groupe spécifique
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Groupe introuvable' });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGroup, getAllGroups, getGroupById };
