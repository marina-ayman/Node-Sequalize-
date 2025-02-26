'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("acl_resources", [
      { id: 1, key: "get_all_todos", value: "Manage all todos", parent_id: null, meta: JSON.stringify({ "public": false }) },
      { id: 2, key: "get_all_users", value: "Manage all users", parent_id: null, meta: JSON.stringify({ "public": false }) },

      { id: 3, key: "todo_post", value: "Create a todo", parent_id: 1, meta: JSON.stringify({ "method": "POST" }) },
      { id: 4, key: "todo_delete", value: "Delete a todo", parent_id: 1, meta: JSON.stringify({ "method": "DELETE" }) },
      { id: 5, key: "todo_update", value: "Update a todo", parent_id: 1, meta: JSON.stringify({ "method": "PUT" }) },

      { id: 6, key: "get_user_todos", value: "Get user todos", parent_id: 2, meta: JSON.stringify({ "method": "GET" }) },
    
     ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acl_resources", null, {});
  }
};