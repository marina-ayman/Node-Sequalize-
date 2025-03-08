const { Model, DataTypes } = require("sequelize"); 
const sequelize = require("../config/database");

const User = require('./User'); 

class RefreshToken extends Model {}


RefreshToken.init({
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users", 
          key: "id", 
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      webUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "web_users", 
          key: "id", 
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_tokens",
      timestamps: false,
    }
  )
  module.exports = RefreshToken;


//   npx sequelize-cli db:migrate

  