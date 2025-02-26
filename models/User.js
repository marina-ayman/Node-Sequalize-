const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");


const bcrypt = require("bcrypt");
const Todo = require("./Todo");
const Role = require("./Role")
class User extends Model {
  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, 
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 20],
          msg: "Name must be more than 5 and less than 20",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 20],
          msg: "Name must be more than 5 and less than 20",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validation: {
        isAdult(value) {
          if (value < 18) {
            throw new Error("age must be more than 18");
          }
        },
      },
    },
    isAdmin: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
role_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 17,
    references: {
      model: 'acl_roles', // Name of the target table
      key: 'id',          // Key in the target table
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },},
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    indexes: [ 
      {
        unique: true,
        fields: ["email"],
      },
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
    },
  },
);

// User.hasMany(Todo, { foreignKey: 'userId' });
// Todo.belongsTo(User, { foreignKey: 'userId' })

module.exports = User 
