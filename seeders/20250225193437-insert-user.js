"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "admin",
        lastName: "Marina",
        email: "admin@gmail.com",
        password: await bcrypt.hash("123456",10),
        age: 24,
        isAdmin: 1,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", { email: "admin@gmail.com" }, {});
  },
};
