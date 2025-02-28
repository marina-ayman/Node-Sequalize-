"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("acl_resources", [
      {
        id: 1,
        key: "admin/get_all_todos",
        value: "all todos",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 2,
        key: "admin/get_all_users",
        value: "all users",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },

      {
        id: 3,
        key: "admin/todo",
        value: " todo",
        parent_id: 1,
        meta: JSON.stringify({ method: ["POST", "DELETE", "PUT"] }),
      },

      {
        id: 4,
        key: "admin/get_user_todos",
        value: "Get user todos",
        parent_id: 2,
        meta: JSON.stringify({ method: "GET" }),
      },
      {
        id: 5, 
        key: "admin/create_role", 
        value: "Create Role", 
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 6,
        key: "admin/update_role",
        value: "Update Role",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 7,
        key: "admin/delete_role",
        value: "Delete Role",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 8,
        key: "admin/view_roles",
        value: "View Roles",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 9,
        key: "admin/view_role",
        value: "View Role",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 10,
        key: "admin/create_resource",
        value: "Create Resource",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 11,
        key: "admin/update_resource",
        value: "Update Resource",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 12,
        key: "admin/delete_resource",
        value: "Delete Resource",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 13,
        key: "admin/view_resources",
        value: "View Resources",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 14,
        key: "admin/view_resource",
        value: "View Resource",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 15,
        key: "admin/create_permission",
        value: "Create Permission",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 16,
        key: "admin/update_permission",
        value: "Update Permission",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 17,
        key: "admin/delete_permission",
        value: "Delete Permission",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 18,
        key: "admin/view_permissions",
        value: "View Permissions",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acl_resources", null, {});
  },
};
