const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('./User'); 

module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define("RefreshToken", {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    RefreshToken.associate = (models) => {
      RefreshToken.belongsTo(models.User, { foreignKey: "userId" });
    };
  
    return RefreshToken;
  };

//   npx sequelize-cli db:migrate

  