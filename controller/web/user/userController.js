const express = require("express");
const User = require("../../../models/User");
const Todo = require("../../../models/Todo");
const sequelize = require("../../../config/database");
const CustomError = require('../../../handler/customError')

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       attributes: [
//         {
//           exclude: ["password"],
//         },
//         [
//           sequelize.fn("DATE_FORMAT", sequelize.col("fromDate"), "%Y-%m-%d"),
//           "formattedFromDate",
//         ],
//         [
//           sequelize.fn("DATE_FORMAT", sequelize.col("toDate"), "%Y-%m-%d"),
//           "formattedToDate",
//         ],
//       ],
//     });

//     return res.status(200).json({ users });
//   } catch (err) {
//     res.status(500).json({ error: `Server error: ${err.message}` });
//   }
// };

const profile = async (req, res, next) => {
  try {
    const profile = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"]
      },
    });   
    return res.status(200).json({ profile });
  } catch (err) {
    next(err)
  }
};
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const loginId = req.user.id;
    const user = await User.findByPk(id);
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
      const updatedUser = await user.update(userUpdate);
      res
        .status(200)
        .json({ msg: "user was edited successfully ", user: updatedUser });
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
    const user = await User.findByPk(paramId);
    if (!user) {
      throw new CustomError("user not found", 404)
    }
    if (user.id  === loginId ) {

      await Todo.destroy({ where: { userId: loginId } });

      await user.destroy();
      return res.status(200).json({ msg: "delete Sucessfuly" });
    } else {
      throw new CustomError("you can`t delete it", 404)
    }
  } catch (err) {
    next(err)
  }
};

module.exports = { profile, updateUser, deleteUser };
