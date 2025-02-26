const { Permission } = require("../models");

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
};

exports.createPermission = async (req, res) => {
  try {
    const { key, value } = req.body;
    const newPermission = await Permission.create({ key, value });
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(500).json({ error: "Failed to create permission" });
  }
};
