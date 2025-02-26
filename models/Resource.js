const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");



class Resource extends Model {}

Resource.init(
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
    parent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: "acl_resources", key: "id" },
    },
    meta: { 
      type: DataTypes.JSON, 
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Resource",
    tableName: "acl_resources",
    timestamps: false,
  }
);

module.exports = Resource;
