const User = require("../../models/User");
const Todo = require("../../models/Todo");
const sequelize = require("../../config/database");
const CustomError = require('../../handler/customError')
const { Op } = require("sequelize");



const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return res.status(200).json({allUsers: allUsers});
  } catch (err) {
    next(err);
  }
}

const getAllTodos = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: {
      exclude: ['password' , 'age'],
      }
    })
    const allTodos = await Todo.findAll(
        {  where: {
          webUserId: { [Op.eq]: null }  
        },
      attributes: {
        include: [
          [
            sequelize.fn("DATE_FORMAT", sequelize.col("fromDate"), "%Y-%m-%d"),
            "formattedFromDate",
          ],
          [
            sequelize.fn("DATE_FORMAT", sequelize.col("toDate"), "%Y-%m-%d"),
            "formattedToDate",
          ],
        ],
        exclude: ["toDate", "fromDate"],
         
      },

      include: [
        { model: User, as: 'User', attributes: ['id', 'email'] },
        { model: User, as: 'CreatedByUser', attributes: ['id', 'email'] }
      ],
      
    }
);
    return res.status(200).json({allTodos:allTodos , allUsers: allUsers} );
  } catch (err) {
    next(err);
  }
}

const getUserTodos = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const allTodos = await Todo.findAll({
      where: { userId: userId },
      attributes: {
        include: [
          [
            sequelize.fn("DATE_FORMAT", sequelize.col("fromDate"), "%Y-%m-%d"),
            "formattedFromDate",
          ],
          [
            sequelize.fn("DATE_FORMAT", sequelize.col("toDate"), "%Y-%m-%d"),
            "formattedToDate",
          ],
        ],
        exclude: ["toDate", "fromDate"],
         
      },
      include: [
        {
          model: User, 
          as: 'User',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    return res.status(200).json({allTodos, allTodos});
  } catch (err) {
    next(err);
  }
}

const addTodo = async (req, res, next) => {
  try {
    const { title, tags, status, fromDate, toDate, userId } = req.body;
    const loginId = req.user.id;
    if (!title || !tags || !fromDate || !toDate || !userId) {
      throw new CustomError("All fields are required" , 403)
    }
    const todoUpdate = {
      title,
      tags,
      status,
      fromDate,
      toDate,
      userId,
      createdBy: loginId,

    };
    const newTodo = await Todo.create(todoUpdate);

    if (!newTodo) {
      throw new CustomError("Failed to add todo" , 403)
    }

    return res.status(200).json({ message: "Added Successfully", todo: newTodo });
  } catch (err) {
    next(err);
  }
};


const updateTodo = async (req, res, next) => {
  try {
    const paramId = req.params.id;
    const loginId = req.user.id;
    const todo = await Todo.findByPk(paramId);
    if (!todo) {
      throw new CustomError("Todo not found", 404)
    }
    const { title, tags, status, fromDate, toDate, userId } = req.body;
    const todoNew = {
      title: title,
      tags: tags,
      status: status,
      fromDate: fromDate,
      toDate: toDate,
      userId: userId,
      updatedBy: loginId
    };
   
      const [updatedTodo] = await Todo.update(todoNew, {
        where: { id: paramId } 
      });

      return res
        .status(200)
        .json({ message: "Updated Sucessfuly", todo: updatedTodo });
 
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const paramId = req.params.id;
    const loginId = req.user.id;
    const todo = await Todo.findByPk(paramId);
    if (!todo) {
      throw new CustomError("Todo not found", 404)
    }
    if (!loginId) {
      throw new CustomError("unathenticated", 404)
    } 
      await todo.destroy();
      return res.status(200).json({ message: "Deleted Successfully" });
  
  } catch (err) {
    next(err)
  }
};

module.exports = {getAllUsers, getAllTodos, getUserTodos, updateTodo, addTodo, deleteTodo }
