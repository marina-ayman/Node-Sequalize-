'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("acl_roles", [
      { key: "admin", value: "Admin Role" },
      { key: "user", value: "User Role" },
      { key: "superUser", value: "superUser Role" },

    ]
  );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acl_roles", null, {});
  }
};

