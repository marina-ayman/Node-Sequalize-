const express= require('express')
const passport = require('passport')
const router= express.Router()
const { registerUser }= require('../controller/auth/registerController.js') 
const { loginUser, refreshUserToken }= require('../controller/auth/loginController.js') 
const validateRequest = require('./../middlewares/validateRequest.js')
const { todoSchema } = require('./../validations/todoValidate.js')
const { userSchema } = require('./../validations/userValidate.js')
const { profile, deleteUser, updateUser }= require('../controller/web/user/userController.js')
const { addTodo, getTodos, deleteTodo, updateTodo, updateStatus }= require('../controller/web/todo/todoController.js')

// auth
router.post('/register', validateRequest(userSchema), registerUser)
router.post('/login', loginUser)
router.post("/refresh-token", refreshUserToken);


// user
router.get('/profile', passport.authenticate('jwt', { session: false }), profile)
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), deleteUser)
router.patch('/user/:id',passport.authenticate('jwt', { session: false }),  validateRequest(userSchema),updateUser)

// todo
router.get('/todos', passport.authenticate('jwt', { session: false }), getTodos)
router.post('/todo',
       passport.authenticate('jwt', { session: false }),
       validateRequest(todoSchema),
       addTodo)
router.delete('/todo/:id', passport.authenticate('jwt', { session: false }), deleteTodo)
router.patch('/todo/:id',passport.authenticate('jwt', { session: false }), validateRequest(todoSchema), updateTodo)
router.put('/status', passport.authenticate('jwt', { session: false }), updateStatus);

module.exports = router
