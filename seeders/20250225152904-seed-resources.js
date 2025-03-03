"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("acl_resources", [
      {
        id: 1,
        key: "pages",
        value: "all pages",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 2,
        key: "todos",
        value: "all todos",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },
      {
        id: 3,
        key: "users",
        value: "all users",
        parent_id: null,
        meta: JSON.stringify({ public: false }),
      },

      {
        id: 4,
        key: "roles",
        value: "roles",
        parent_id: 1,
        meta: JSON.stringify({ method: ["POST", "DELETE", "PUT"] }),
      },

    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acl_resources", null, {});
  },
};
