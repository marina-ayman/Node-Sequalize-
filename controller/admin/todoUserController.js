const User = require("../../models/User");
const Todo = require("../../models/Todo");
const sequelize = require("../../config/database");

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
    const allTodos = await Todo.findAll(
        {
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
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
      
    }
);
    return res.status(200).json({allTodos:allTodos} );
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
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    return res.status(200).json({allTodos, allTodos});
  } catch (err) {
    next(err);
  }
}

module.exports = {getAllUsers, getAllTodos, getUserTodos}
