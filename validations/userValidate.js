const Joi = require("joi")
const User = require("../models/User")

const userSchema = Joi.object({
  firstName: Joi.string().min(5).max(20).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least {#limit} characters",
    "string.max": "First name must not exceed {#limit} characters",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least {#limit} characters",
    "string.max": "Last name must not exceed {#limit} characters",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least {#limit} characters",
  }),

  age: Joi.number().integer().min(18).max(90).required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least {#limit}",
    "number.max": "Age must not exceed {#limit}",
    "any.required": "Age is required",
  }),
})

// const validateUser = async (req, res, next) => {
//   const { error } = userSchema.validate(req.body)
//   if (error) return res.status(400).json({ error: error.details[0].message });
//   next()
// }

module.exports = { userSchema }
