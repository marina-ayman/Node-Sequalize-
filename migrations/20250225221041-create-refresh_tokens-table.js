
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("refresh_tokens", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users", 
          key: "id", 
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      webUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: "web_users", 
          key: "id", 
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("refresh_tokens");
  },
};