module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("acl_permissions", [
      {
        id: 1,
        role_id: 1,
        resource_id: 1, //pages
        permissions: JSON.stringify(["view_users"]),
      },
      {
        id: 2,
        role_id: 1,
        resource_id: 1, //pages
        permissions: JSON.stringify(["view_todos"]),
      },
      {
        id: 3,
        role_id: 1,
        resource_id: 1, //pages
        permissions: JSON.stringify(["view_roles"]),
      },
      {
        id: 4,
        role_id: 1,
        resource_id: 2, //todos
        permissions: JSON.stringify(["create_todo"]),
      },
      {
        id: 5,
        role_id: 1,
        resource_id: 2, //todos
        permissions: JSON.stringify(["delete_todo"]),
      },
      {
        id: 6,
        role_id: 1,
        resource_id: 2, //todos
        permissions: JSON.stringify(["update_todo"]),
      },
      {
        id: 7,
        role_id: 1,
        resource_id: 2, //todos
        permissions: JSON.stringify(["export_user_todo"]),
      },
      {
        id: 8,
        role_id: 1,
        resource_id: 3, //users
        permissions: JSON.stringify(["create_user"]),
      },
      {
        id: 9,
        role_id: 1,
        resource_id: 3, //users
        permissions: JSON.stringify(["delete_user"]),
      },
      {
        id: 10,
        role_id: 1,
        resource_id: 3, //users
        permissions: JSON.stringify(["update_user"]),
      },
      {
        id: 11,
        role_id: 1,
        resource_id: 3, //users
        permissions: JSON.stringify(["view_user_todos"]),
      },
      {
        id: 12,
        role_id: 1,
        resource_id: 4, //roles
        permissions: JSON.stringify(["create_role"]),
      },
      {
        id: 13,
        role_id: 1,
        resource_id: 4, //roles
        permissions: JSON.stringify(["update_role"]),
      },
      {
        id: 14,
        role_id: 1,
        resource_id: 4, //roles
        permissions: JSON.stringify(["delete_role"]),
      },
      {
        id: 15,
        role_id: 1,
        resource_id: 4, //roles
        permissions: JSON.stringify(["export_role"]),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acl_permissions", null, {});
  },
};
