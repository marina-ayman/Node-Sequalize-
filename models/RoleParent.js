const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");


class RoleParent extends Model {}

RoleParent.init( {},
    {
        sequelize,
        modelName: "RoleParent",
        tableName: "acl_parents",
        timestamps: false,
      }
);

module.exports = RoleParent ;
