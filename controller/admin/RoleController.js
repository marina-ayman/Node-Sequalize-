const { Role } = require('../../models');

class RoleController {
  static async createRole(req, res) {
    try {
      const { key, value } = req.body;
      const role = await Role.create({ key, value });
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { key, value } = req.body;
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      await role.update({ key, value });
      res.json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      await role.destroy();
      res.json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id, {
        include: ['resources'], 
      });
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RoleController;