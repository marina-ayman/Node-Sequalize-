const { Permission, Role, Resource } = require('../../models');

class PermissionController {
  static async createPermission(req, res) {
    try {
      const { role_id, resource_id, permissions } = req.body;
      const permission = await Permission.create({ role_id, resource_id, permissions });
      res.status(201).json(permission);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePermission(req, res) {
    try {
      const { id } = req.params;
      const { permissions } = req.body;
      const permission = await Permission.findByPk(id);
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
      await permission.update({ permissions });
      res.json(permission);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deletePermission(req, res) {
    try {
      const { id } = req.params;
      const permission = await Permission.findByPk(id);
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
      await permission.destroy();
      res.json({ message: 'Permission deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPermissionsByRole(req, res) {
    try {
      const { roleId } = req.params;
      const permissions = await Permission.findAll({
        where: { role_id: roleId },
        include: ['resource'], 
      });
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PermissionController;