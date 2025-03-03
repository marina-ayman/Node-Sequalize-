const express = require("express");
const User = require("../../models/User");
const Todo = require("../../models/Todo");
const sequelize = require("../../config/database");
const CustomError = require("../../handler/customError");

const profile = async (req, res, next) => {
  try {
    const profile = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });
    return res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, age, role_id } = req.body;
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      throw new CustomError("User already exists", 402);
    }
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      age,
      role_id,
    });
    return res.status(201).json({
      message: "User Added successfully",
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const loginId = req.user.id;
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const { firstName, lastName, email, password, age, role_id } = req.body;
    const userUpdate = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      age: age,
      role_id: role_id,
    }
      const updatedUser = await user.update(userUpdate);
     return res
        .status(200)
        .json({ message: "user was edited successfully ", user: updatedUser });

  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const paramId = req.params.id;
    const loginId = req.user.id;
    const user = await User.findByPk(paramId);
    if (!user) {
      throw new CustomError("user not found", 404);
    }
    await Todo.destroy({ where: { userId: loginId } });

    await user.destroy();
    return res.status(200).json({ message: "delete Successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { profile, updateUser, deleteUser, addUser };
