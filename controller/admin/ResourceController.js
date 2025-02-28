const { Resource } = require('../../models');

class ResourceController {
  static async createResource(req, res) {
    try {
      const { key, value, parent_id, meta } = req.body;
      const resource = await Resource.create({ key, value, parent_id, meta });
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateResource(req, res) {
    try {
      const { id } = req.params;
      const { key, value, parent_id, meta } = req.body;
      const resource = await Resource.findByPk(id);
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      await resource.update({ key, value, parent_id, meta });
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteResource(req, res) {
    try {
      const { id } = req.params;
      const resource = await Resource.findByPk(id);
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      await resource.destroy();
      res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllResources(req, res) {
    try {
      const resources = await Resource.findAll();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getResourceById(req, res) {
    try {
      const { id } = req.params;
      const resource = await Resource.findByPk(id, {
        include: ['roles'], 
      });
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ResourceController;