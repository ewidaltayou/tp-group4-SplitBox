import Group from "../models/Group.js";

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = await Group.create({
      name,
      members
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().sort({
      createdAt: -1
    });

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        message: "Group not found"
      });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};