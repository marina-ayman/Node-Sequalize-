const { Role, Resource, Permission } = require("../../models");

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

    console.log("______________________________________", req.body);

    // const resources = await resources.create({ key, value });

    res.status(201).json("role");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { key, value } = req.body.role
    const role = await Role.findByPk(id)
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    const roleUpdate = {
      key: key,
      value: value
    }
     await Role.update(roleUpdate, {
      where: { id: paramId } 
    })
    const resources = req.body.resources
    const filteredResources = Object.entries(resources).filter(
      ([id, permissions]) => permissions.length > 0
    )

    for (const [id, permissions] of filteredResources) {
      await Permission.update( permissions ,
       { where: { resource_id: id , role_id: role.id } })
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id)
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    await Permission.destroy({ where: { role_id: id } });

    await role.destroy();

    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "Role not found" });
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


    res.json({data:data});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getResourcesData = async (req, res) => {
  try {
    const resources = await Resource.findAll({
      attributes: ["id", "key"],
      include: [
        {
          model: Role,
          as: "roles",
          through: {
            model: Permission,
            attributes: ["permissions"],
          },
        },
      ],
    });

    const formattedResources = resources.map((resource) => {
      const permissionsSet = new Set(); // no repeated

      resource.roles.forEach((role) => {
        if (role.Permission && role.Permission.permissions) {
          let perms = role.Permission.permissions;

          if (typeof perms === "string") {
            try {
              perms = JSON.parse(perms); //to arr
            } catch (error) {
              perms = [];
            }
          }

          if (Array.isArray(perms)) {
            perms.forEach((perm) => permissionsSet.add(perm));
          }
        }
      });

      return {
        id: resource.id,
        key: resource.key,
        permissions: [...permissionsSet],
      };
    });

    res.json({ resources: formattedResources });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
