const User= require('../../models/User')
const CustomError = require('../../handler/customError')

const registerUser = async (req, res, next) => {
    try {
     const { firstName, lastName, email, password, age} = req.body   
     const userExists = await User.findOne({ where: { email: email } })
     if(userExists){
      throw new CustomError("User already exists", 402)
      }
     const newUser = await User.create({firstName, lastName, email, password, age , role_id: 2})   
     res.status(201).json({
        message: "User registered successfully",
        user: newUser
      });
    } catch(err) {
        next(err)
    }
}

module.exports = { registerUser }