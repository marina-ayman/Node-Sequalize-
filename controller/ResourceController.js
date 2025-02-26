const { Resource } = require("../models");

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

exports.createResource = async (req, res) => {
  try {
    const { key, value } = req.body;
    const newResource = await Resource.create({ key, value });
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: "Failed to create resource" });
  }
};
