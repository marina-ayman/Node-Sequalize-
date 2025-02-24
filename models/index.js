const { DataTypes } = require("sequelize");
const sequelize = require("../config/database")


const User = require('./User')
const Todo = require('./Todo')
const RefreshToken = require("./RefreshToken")(sequelize, DataTypes)


User.hasMany(Todo, { foreignKey: 'userId' })
Todo.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(RefreshToken, { foreignKey: "userId" })
RefreshToken.belongsTo(User, { foreignKey: "userId" })



module.exports = {
    sequelize,
    User,
    Todo,
    RefreshToken,
  };