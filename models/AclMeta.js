const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");



class AclMeta extends Model {}

AclMeta.init(
  {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
    key: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "AclMeta",
    tableName: "acl_meta",
    timestamps: false,
  }
);

module.exports = AclMeta;
