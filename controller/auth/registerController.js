const WebUser= require('../../models/WebUser')
const CustomError = require('../../handler/customError')

const registerUser = async (req, res, next) => {
    try {
     
     const { firstName, lastName, email, password, age} = req.body   
     const userExists = await WebUser.findOne({ where: { email: email } })
     if(userExists){
      throw new CustomError("User already exists", 402)
      }
     const newUser = await WebUser.create({firstName, lastName, email, password, age })   
     console.log('__________________________________________', newUser)

     res.status(201).json({
        message: "User registered successfully",
        user: newUser
      });
    } catch(err) {
        next(err)
    }
}

module.exports = { registerUser }