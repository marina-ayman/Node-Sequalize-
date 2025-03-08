const express = require("express");
const WebUser = require("../../../models/WebUser");
const Todo = require("../../../models/Todo");
const sequelize = require("../../../config/database");
const CustomError = require('../../../handler/customError')

const profile = async (req, res, next) => {
  try {
    const profile = await WebUser.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"]
      },
    });   
    console.log('------------------------profile', profile)
    return res.status(200).json({ profile });
  } catch (err) {
    next(err)
  } 
};
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const loginId = req.user.id;
    const user = await WebUser.findByPk(id);
    if (!user) {
      throw new CustomError("User not found", 404)
    }

    const { firstName, lastName, email, password, age } = req.body;
    const userUpdate = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      age: age,
    };

    if (user.id  === loginId ) {
      const updatedUser = await WebUser.update(
        userUpdate,{
          where: { id: user.id },
        })
      console.log('_______________________')

      return res
        .status(200)
        .json({ message: "user was edited successfully ", user: updatedUser });
    } else {
      throw new CustomError("You can't edit this user", 403)
    }

  } catch (err) {
    next(err)

  }
};

const deleteUser = async (req, res, next) => {
  try {
    const paramId = req.params.id;
    const loginId = req.user.id;
    const user = await WebUser.findByPk(paramId);
    if (!user) {
      throw new CustomError("user not found", 404)
    }
    if (user.id  === loginId ) {

      await Todo.destroy({ where: { userId: loginId } });

      await WebUser.destroy();
      return res.status(200).json({ message: "delete Sucessfuly" });
    } else {
      throw new CustomError("you can`t delete it", 404)
    }
  } catch (err) {
    next(err)
  }
};

module.exports = { profile, updateUser, deleteUser };
