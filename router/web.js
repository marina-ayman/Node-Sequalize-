const express= require('express')
const webPassport = require('passport');
require('../config/webpassport.js')(webPassport);  
const router= express.Router()
const { registerUser }= require('../controller/auth/registerController.js') 
const { loginUser, refreshUserToken }= require('../controller/auth/loginController.js') 
const validateRequest = require('./../middlewares/validateRequest.js')
const { todoSchema } = require('./../validations/todoValidate.js')
const { WebUserSchema } = require('./../validations/webUserValidation.js')
const { profile, deleteUser, updateUser }= require('../controller/web/user/userController.js')
const { addTodo, getTodos, deleteTodo, updateTodo, updateStatus }= require('../controller/web/todo/todoController.js')


// auth
router.post('/register', validateRequest(WebUserSchema), registerUser)
router.post('/login', loginUser)
router.post("/refresh-token", refreshUserToken);


// user
router.get('/profile', webPassport.authenticate('jwt', { session: false }), profile)
router.delete('/user/:id', webPassport.authenticate('jwt', { session: false }), deleteUser)
router.patch('/user/:id' , webPassport.authenticate('jwt', { session: false }),  validateRequest(WebUserSchema),updateUser)

// todo
router.get('/todos', webPassport.authenticate('jwt', { session: false }), getTodos)
router.post('/todo',
       webPassport.authenticate('jwt', { session: false }),
       validateRequest(todoSchema),
       addTodo)
router.delete('/todo/:id', webPassport.authenticate('jwt', { session: false }), deleteTodo)
router.patch('/todo/:id',webPassport.authenticate('jwt', { session: false }), validateRequest(todoSchema), updateTodo)
router.patch('/status', webPassport.authenticate('jwt', { session: false }), updateStatus);

module.exports = router
