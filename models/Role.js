const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");



class Role extends Model {}

Role.init(
  {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "acl_roles",
    timestamps: false,
  }
);

module.exports = Role;
