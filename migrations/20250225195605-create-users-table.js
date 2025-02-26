'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 1,
        references: {
          model: "acl_roles", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      // name: 'users_ibfk_1',
    });
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint('users', 'users_ibfk_1', { ifExists: true });
    await queryInterface.dropTable("users");

  },
};

