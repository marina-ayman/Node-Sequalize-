const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");


class Permission extends Model {}

Permission.init(
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
    resource_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "acl_resources",
        key: "id",        
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "acl_permissions",
    timestamps: false,
  }
);

module.exports = Permission;
