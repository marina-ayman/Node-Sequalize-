const { DataTypes } = require("sequelize");
const sequelize = require("../config/database")


const User = require('./User')
const Todo = require('./Todo')


User.hasMany(Todo, { foreignKey: 'userId' })
Todo.belongsTo(User, { foreignKey: 'userId' })


module.exports = {
    sequelize,
    User,
    Todo,
  };