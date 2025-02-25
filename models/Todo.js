const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('./User'); 

class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE", 
        onUpdate: "CASCADE",
      });
    }
  }


Todo.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: {
          args: [5, 20],
          msg: "title must be more than 5 and less than 20",
        },
      },
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: {
          args: [[0, 1, 2]], // 0 toDo.. 1 onProgress.. 2 Done
          msg: "status Error",
        },
      },
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      //  new Date().toISOString().split("T")[0],
      //  new Date()
      // .toISOString() → YYYY-MM-DDTHH:MM:SS.sssZ
      // .split('T')[0] → YYYY-MM-DD.
      validate: {
        isDate: true,
        isTodayOrAfter(value) {
          const inputDate = new Date(value);
          inputDate.setHours(0, 0, 0, 0);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (inputDate < today) {
            throw new Error("date must be today or after");
          }
        },
      },
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterFromDate(value) {
          if (new Date(value) <= new Date(this.fromDate)) {
            throw new Error("toDate must be after fromDate");
          }
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', 
        key: 'id'
      }
    },
  },
  { 
    sequelize,
    modelName: "Todo", 
    tableName: "todos", 
    timestamps: true 
  }
);


module.exports =  Todo
