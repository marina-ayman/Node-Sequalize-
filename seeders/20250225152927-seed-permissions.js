// acl_permissions.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("acl_permissions", [
      {
        id: 1,
        role_id: 1,
        resource_id: 1,
        permissions: JSON.stringify(["view_todos"]),
        key: "admin:get_all_todos",
        value: "['view']",
      }, 
      {
        id: 2,
        role_id: 1,
        resource_id: 2,
        permissions: JSON.stringify(["view_users"]),
        key: "admin:get_all_users",
        value: "['view']",
      },
      {
        id: 3,
        role_id: 1,
        resource_id: 4,
        permissions: JSON.stringify(["view_user_todos"]),
        key: "admin:get_user_todos",
        value: "['view']",
      }, // admin:get_all_todos
      {
        id: 4,
        role_id: 1,
        resource_id: 3,
        permissions: JSON.stringify(["create_todo", "delete_todo", "update_todo"]),
        key: "admin:todo",
        value: "['create','delete','update']",
      }, // admin:todo

      {
        id: 5,
        role_id: 2,
        resource_id: 1,
        permissions: JSON.stringify(["view_todos"]),
        key: "user:get_all_todos",
        value: "['view']",
      }, // user:get_all_todos
      {
        id: 6,
        role_id: 2,
        resource_id: 4,
        permissions: JSON.stringify(["view_user_todos"]),
        key: "user:get_user_todos",
        value: "['view']",
      }, // user:get_user_todos

      {
        id: 7,
        role_id: 3,
        resource_id: 1,
        permissions: JSON.stringify(["view_todos"]),
        key: "superUser:get_all_todos",
        value: "['view']",
      }, // user:get_all_todos
      {
        id: 8,
        role_id: 3,
        resource_id: 3,
        permissions: JSON.stringify(["create_todo"]),
        key: "superUser:todo",
        value: "['create']",
      }, // superUser:todo
      {
        id: 9, 
        role_id: 1,
        resource_id: 5, 
        permissions: JSON.stringify(["create_role"]),
        key: "admin:create_role", 
        value: "['create']",
      },
      {
        id: 10,
        role_id: 1,
        resource_id: 6,
        permissions: JSON.stringify(["update_role"]),
        key: "admin:update_role",
        value: "['update']",
      },
      {
        id: 11,
        role_id: 1,
        resource_id: 7,
        permissions: JSON.stringify(["delete_role"]),
        key: "admin:delete_role",
        value: "['delete']",
      },
      {
        id: 12,
        role_id: 1,
        resource_id: 8,
        permissions: JSON.stringify(["view_roles"]),
        key: "admin:view_roles",
        value: "['view']",
      },
      {
        id: 13,
        role_id: 1,
        resource_id: 9,
        permissions: JSON.stringify(["view_role"]),
        key: "admin:view_role",
        value: "['view']",
      },
      {
        id: 14,
        role_id: 1,
        resource_id: 10,
        permissions: JSON.stringify(["create_resource"]),
        key: "admin:create_resource",
        value: "['create']",
      },
      {
        id: 15,
        role_id: 1,
        resource_id: 11,
        permissions: JSON.stringify(["update_resource"]),
        key: "admin:update_resource",
        value: "['update']",
      },
      {
        id: 16,
        role_id: 1,
        resource_id: 12,
        permissions: JSON.stringify(["delete_resource"]),
        key: "admin:delete_resource",
        value: "['delete']",
      },
      {
        id: 17,
        role_id: 1,
        resource_id: 13,
        permissions: JSON.stringify(["view_resources"]),
        key: "admin:view_resources",
        value: "['view']",
      },
      {
        id: 18,
        role_id: 1,
        resource_id: 14,
        permissions: JSON.stringify(["view_resource"]),
        key: "admin:view_resource",
        value: "['view']",
      },
      {
        id: 19,
        role_id: 1,
        resource_id: 15,
        permissions: JSON.stringify(["create_permission"]),
        key: "admin:create_permission",
        value: "['create']",
      },
      {
        id: 20,
        role_id: 1,
        resource_id: 16,
        permissions: JSON.stringify(["update_permission"]),
        key: "admin:update_permission",
        value: "['update']",
      },
      {
        id: 21,
        role_id: 1,
        resource_id: 17,
        permissions: JSON.stringify(["delete_permission"]),
        key: "admin:delete_permission",
        value: "['delete']",
      },
      {
        id: 22,
        role_id: 1,
        resource_id: 18,
        permissions: JSON.stringify(["view_permissions"]),
        key: "admin:view_permissions",
        value: "['view']",
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acl_permissions", null, {});
  },
};
