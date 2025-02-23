const jwt = require('jsonwebtoken')
const User = require("../../models/User")
const CustomError = require('../../handler/customError')
require("dotenv").config()

const loginUser = async (req, res, next) => {
  try {
  const { email, password } = req.body;
  if(!email || !password){
    throw new CustomError("All fields are required!", 400)
  }
  const userExists = await User.findOne({ where: { email } })
  if (!userExists){
      // const error = new Error("go to Sign IN") 
      // error.statusCode = 401;
      // throw error
      throw new CustomError("Go To Sign-IN", 401)
  }
  const isMatch = await userExists.verifyPassword(password)
  if(!isMatch) {
    throw new CustomError("Wrong Email or Password", 401)
  }
  const token = jwt.sign(userExists.get({ plain: true }), process.env.SECRET_KEY , { expiresIn: '48h' });
  res.status(200).json({
    message: "User loggined successfully",
    user: userExists,
    token: token
  })
} catch (err) {
  next(err); 
}
}

module.exports = { loginUser }
