const express = require("express");
const Todo = require("../../../models/Todo");
const sequelize = require("../../../config/database");
const CustomError = require('../../../handler/customError')

const getTodos = async (req, res, next) => {
  try {
    const loginId = req.user.id;
    const todos = await Todo.findAll(
      {
      where: { userId: loginId },
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
        exclude:['toDate','fromDate']
      },
    }
  );
  
    return res.status(200).json({ todos });
  } catch (err) {
    next(err)
  }
};

const addTodo = async (req, res, next) => {
  try {
    const { title, tags, status, fromDate, toDate } = req.body;
    const loginId = req.user.id;

    if (!title || !tags || !fromDate || !toDate) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const todoUpdate = {
      title,
      tags,
      status,
      fromDate,
      toDate,
      userId: loginId
    };

    const newTodo = await Todo.create(todoUpdate);

    if (!newTodo) {
      return res.status(500).json({ msg: "Failed to add todo" });
    }

    return res.status(200).json({ msg: "Added Successfully", todo: newTodo });
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
    const { title, tags, status, fromDate, toDate } = req.body;
    const todoNew = {
      title: title,
      tags: tags,
      status: status,
      fromDate: fromDate,
      toDate: toDate,

    };
    if (todo.userId  === loginId ) {
      const [updatedTodo] = await Todo.update(todoNew, {
        where: { id: paramId } 
      });

      return res
        .status(200)
        .json({ msg: "Updated Sucessfuly", todo: updatedTodo });
    } else {
      throw new CustomError("you can`t edit it", 404)
    }
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
    if (todo.userId  === loginId ) {
      await todo.destroy();
      return res.status(200).json({ msg: "Deleted Sucessfuly" });
    } else {
      throw new CustomError("you can`t edit it", 404)
    }

  } catch (err) {
    next(err)
  }
};

// await
const updateStatus = async (req, res, next) => {
  try {
    const todoId = req.body.id;
    const status = req.body.status;
    const loginId = req.user.id;
    const todo = await todo.findByPk(todoId);
    if (!todo) {
      throw new CustomError("Todo not found", 404)
    }
    if (user.id  === loginId ) {
      await user.update({ status: status }, { fields: ['status'] });
      return res.status(200).json({ msg: "Deleted Sucessfuly" });
    } else {
      throw new CustomError("you can`t edit it", 404)
    }

  } catch (err) {
    next()
  }
};
module.exports = { getTodos, updateTodo, deleteTodo, addTodo, updateStatus };
