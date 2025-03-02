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
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "acl_roles",
        key: "id",        
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
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
