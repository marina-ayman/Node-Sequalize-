const Joi = require("joi")
const Todo = require("../models/Todo")

const todoSchema = Joi.object({
  title: Joi.string().alphanum().min(5).max(20).required().messages({
    "string.empty": "Title is required",
    "string.alphanumeric": "Title must be alphanumeric",
    "string.min": "Title must be more than 5 characters",
    "string.max": "Title must be less than 20 characters",
  }),

  tags: Joi.array().items(Joi.string()).required().messages({
    "array.base": "Tags must be an array of strings",
    "array.empty": "Tags are required",
  }),

  // status: Joi.number().valid(0, 1, 2).required().messages({
  //   "number.base": "Status must be a number",
  //   "any.only": "Status must be 0, 1, or 2",
  //   "any.required": "Status is required",
  // }),

  fromDate: Joi.date().required().messages({
    // greater("now")
    "date.base": "From Date must be a valid date",
    // "date.greater": "From Date must be today or after",
    "any.required": "From Date is required",
  }),

  toDate: Joi.date().required().messages({
    // .greater(Joi.ref("fromDate"))
    "date.base": "To Date must be a valid date",
    // "date.greater": "To Date must be after From Date",
    "any.required": "To Date is required",
  }),
  userId: Joi.number().integer(),

})

// const validateTodo = async (req, res, next) => {
//   const { error } = todoSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message })
//   }
//   next()
// }

module.exports = { todoSchema }
