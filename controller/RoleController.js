const { Role } = require("../models");

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { key, value } = req.body;
    const newRole = await Role.create({ key, value });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: "Failed to create role" });
  }
};
