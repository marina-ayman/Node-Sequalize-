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
      {
        firstName: "user Role",
        lastName: "Marina",
        email: "user@gmail.com",
        password: await bcrypt.hash("123456",10),
        age: 24,
        isAdmin: 0,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "superAdmin",
        lastName: "Marina",
        email: "superAdmin@gmail.com",
        password: await bcrypt.hash("123456",10),
        age: 24,
        isAdmin: 0,
        role_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", { email: "admin@gmail.com" }, {});
  },
};
