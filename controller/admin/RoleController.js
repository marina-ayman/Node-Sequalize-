const { Role, Resource, Permission } = require("../../models");
const CustomError = require('../../handler/customError')

const createRole = async (req, res) => {
  try {
    // role: { key: 'mmmm', value: 'mmmmm' },
    // resources: {
    //   '1': [ 'create_todo', 'delete_todo', 'update_todo' ],
    //   '2': [],
    //   '3': [],
    //   '4': [ 'view_permissions' ],
    //   '5': []
    const { key, value } = req.body.role;

    const role = await Role.create({ key, value });

    const resources = req.body.resources;

    const filteredResources = Object.entries(resources).filter(
      ([id, permissions]) => permissions.length > 0
    );

    for (const [id, permissions] of filteredResources) {
      await Permission.create({
        resource_id: id,
        permissions,
        role_id: role.id,
      });
    }

    // const resources = await resources.create({ key, value });

   return res.status(201).json({role , message: "Role Created Successfully"});
  } catch (error) {
    throw new CustomError( error.message, 403)
  }
};

const updateRole = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const { key, value } = req.body.role;
    const role = await Role.findByPk(id);
    if (!role) {
      throw new CustomError("Role not found", 403)
    }
    const roleUpdate = {
      key: key,
      value: value,
    };
    await Role.update(roleUpdate, {
      where: { id: id },
    });
    const resources = req.body.resources;
    const filteredResources = Object.entries(resources).filter(
      ([id, permissions]) => permissions.length > 0
    );

    for (const [id, permissions] of filteredResources) {
      await Permission.update(permissions, {
        where: { resource_id: id, role_id: role.id },
      });
    }
   return res.status(201).json({role , message: "Role updated Successfully"});
  } catch (error) {
    next(error)
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      throw new CustomError("Role not found", 403)

    }
    await Permission.destroy({ where: { role_id: id } });

    await role.destroy();

   return res.json({ message: "Role deleted successfully" });
  } catch (error) {
    throw new CustomError( error.message, 403)
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.json(roles);
  } catch (error) {
    throw new CustomError( error.message, 403)
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      attributes: ["id", "key", "value"],
      include: [
        {
          model: Resource,
          as: "resources",
          through: {
            model: Permission,
            attributes: ["permissions"],
          },
        },
      ],
    });

    if (!role) {
      throw new CustomError("Role not found", 403)
    }

    let resources = role.resources.map((resource) => {
      let permissions = [];

      if (resource.Permission && resource.Permission.permissions) {
        let perms = resource.Permission.permissions;

        if (typeof perms === "string") {
          try {
            perms = JSON.parse(perms); // Convert string to array
          } catch (error) {
            perms = [];
          }
        }

        if (Array.isArray(perms)) {
          permissions = permissions.concat(perms);
        }
      }

      return {
        id: resource.id,
        key: resource.key,
        permissions: permissions,
      };
    });

    const data = {
      id: role.id,
      key: role.key,
      resources: resources,
    };

   return res.json({ data: data });
  } catch (error) {
    throw new CustomError(error.message, 403)
  }
};

const getResourcesData = async (req, res) => {
  try {
    const resources = await Resource.findAll({
      attributes: ["id", "key"],
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["permissions"],
        },
      ],
    });

    const formattedResources = resources.map((resource) => {
      const permissions = resource.permissions
        ?.map((p) => JSON.parse(p.permissions))
        .flat();

      const uniquePermissions = [...new Set(permissions)];

      return {
        id: resource.id,
        key: resource.key,
        permissions: uniquePermissions || [],
      };
    });

    // console.log(formattedResources);

   return res.json({ resources: formattedResources });
  } catch (error) {
    throw new CustomError(error.message, 403)

  }
};

module.exports = {
  getRoleById,
  getAllRoles,
  deleteRole,
  updateRole,
  createRole,
  getResourcesData,
};
