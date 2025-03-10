const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Todo = require("./Todo");
const Role = require("./Role");
const Resource = require("./Resource");
const Permission = require("./Permission");
const RoleParent = require("./RoleParent");
const RefreshToken = require("./RefreshToken");
const WebUser = require("./WebUser")

User.hasMany(Todo, { foreignKey: "userId", as: "Tasks" });
Todo.belongsTo(User, { foreignKey: "userId", as: "User" });

User.hasMany(Todo, { foreignKey: "createdBy", as: "CreatedTasks" });
Todo.belongsTo(User, { foreignKey: "createdBy", as: "CreatedByUser" });

WebUser.hasMany(Todo, { foreignKey: "userId", as: "webTasks" });
Todo.belongsTo(WebUser, { foreignKey: "webUserId", as: "webUser" });


User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

// Role.hasMany(Permission, { foreignKey: "role_id", as: 'RolePermission' });

Role.belongsToMany(Resource, { through: Permission, foreignKey: "role_id" , otherKey: 'resource_id',
  as: 'resources'});
Resource.belongsToMany(Role, { through: Permission, foreignKey: "resource_id", otherKey: 'role_id',
  as: 'roles'  });


Resource.hasMany(Permission, { 
  foreignKey: "resource_id", 
  as: "permissions" 
});

Permission.belongsTo(Resource, { 
  foreignKey: "resource_id", 
  as: "resource" 
});

Role.belongsToMany(Role, { through: RoleParent, as: "Children", foreignKey: "role_id", otherKey: "parent_id" });
Role.belongsToMany(Role, { through: RoleParent, as: "Parents", foreignKey: "parent_id", otherKey: "role_id" });

User.belongsTo(Role, { foreignKey: "role_id", as: "role" });  
// user( include: model Role as role ,attr() ) 

Resource.belongsTo(Resource, { as: "parent", foreignKey: "parent_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = {
  sequelize,
  User,
  Todo,
  RefreshToken,
  Role,
  Resource,
  Permission,
  RoleParent,
};