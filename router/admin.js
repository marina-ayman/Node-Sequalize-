const adminPassport = require('passport')
require('../config/passport.js')(adminPassport) 
const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const { loginUser, refreshAdminToken }= require('../controller/admin/auth/loginController.js') 
const { profile, deleteUser, updateUser, addUser }= require('../controller/admin/userController.js')
const validateRequest= require('./../middlewares/validateRequest.js')
const { todoSchema } = require('./../validations/todoValidate.js')
const { userSchema }= require('./../validations/userValidate.js')
const { getAllUsers, getAllTodos, getUserTodos ,addTodo, deleteTodo, updateTodo }= require('../controller/admin/todoUserController.js')

// auth
router.post('/login', loginUser)
router.post("/admin-refresh-token", refreshAdminToken)

// user
//  adminPassport.authenticate('UserJwt', { session: false })
router.post('/user', adminPassport.authenticate('UserJwt', { session: false }), authorize(["create_user"]),  addUser)
router.get('/profile', adminPassport.authenticate('UserJwt', { session: false }), profile)
router.delete('/user/:id', adminPassport.authenticate('UserJwt', { session: false }), authorize(["delete_user"]),  deleteUser)
router.patch('/user/:id', adminPassport.authenticate('UserJwt', { session: false }), authorize(["update_user"]),  validateRequest(userSchema), updateUser)

// todo
router.get('/get_all_users', adminPassport.authenticate('UserJwt', { session: false }), 
getAllUsers)
router.get('/get_all_todos', adminPassport.authenticate('UserJwt', { session: false }), authorize(["view_todos"]), 
getAllTodos)
router.get('/get_user_todos/:id', adminPassport.authenticate('UserJwt', { session: false }),
authorize(["view_user_todos"]),
 getUserTodos)


router.post('/todo',
  adminPassport.authenticate('UserJwt', { session: false }),
  authorize(["create_todo"]),
  validateRequest(todoSchema),
  addTodo)


router.delete('/todo/:id', adminPassport.authenticate('UserJwt', { session: false }),
authorize(["delete_todo"]),
 deleteTodo)
router.patch('/todo/:id',adminPassport.authenticate('UserJwt', { session: false }),
  authorize(["update_todo"]), 
  validateRequest(todoSchema), updateTodo)



// router.get(
//   "/protected",
//   adminPassport.authenticate("headerapikey", { session: false }),
//   (req, res) => {
//     res.status(200).json({ message: "You have access!", user: req.user });
//   }
// );

// // Google Authentication
// router.get(
//   "/google",
//   adminPassport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//   "/google/callback",
//   adminPassport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/dashboard");
//   }
// );

// // Facebook Authentication
// router.get(
//   "/facebook",
//   adminPassport.authenticate("facebook", { scope: ["email"] })
// );
// router.get(
//   "/facebook/callback",
//   adminPassport.authenticate("facebook", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/dashboard");
//   }
// );


module.exports = router;
