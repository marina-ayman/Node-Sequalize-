const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");


const User = require('./User'); 

class Todo extends Model {
    
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
          message: "title must be more than 5 and less than 20",
        },
      },
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: {
          args: [[0, 1, 2]], // 0 toDo.. 1 onProgress.. 2 Done
          message: "status Error",
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
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Users', 
        key: 'id'
      }
    },
    webUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'WebUser', 
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users', 
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
