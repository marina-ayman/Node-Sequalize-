const express = require("express");
const router = express.Router();
const passport = require("passport");
const { loginUser, refreshAdminToken }= require('../controller/admin/auth/loginController.js') 
const { profile, deleteUser, updateUser }= require('../controller/web/user/userController.js')
const validateRequest= require('./../middlewares/validateRequest.js')
// const verifyPermission= require('./../middlewares/aclMiddleware.js')
const { todoSchema } = require('./../validations/todoValidate.js')
const { userSchema }= require('./../validations/userValidate.js')
const { getAllUsers, getAllTodos, getUserTodos ,addTodo, deleteTodo, updateTodo }= require('../controller/admin/todoUserController.js')

// auth
router.post('/login', loginUser)
router.post("/admin-refresh-token", refreshAdminToken)


// user
router.get('/profile', passport.authenticate('jwt', { session: false }), profile)
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), deleteUser)
router.patch('/user/:id',passport.authenticate('jwt', { session: false }) , validateRequest(userSchema), updateUser)

// todo
router.get('/get_all_users', getAllUsers)
router.get('/get_all_todos', getAllTodos)
router.get('/get_user_todos/:id', getUserTodos)



router.post('/todo',
  passport.authenticate('jwt', { session: false }),
  validateRequest(todoSchema),
  addTodo)
router.delete('/todo/:id', passport.authenticate('jwt', { session: false }), deleteTodo)
router.patch('/todo/:id',passport.authenticate('jwt', { session: false }), validateRequest(todoSchema), updateTodo)
  











router.get(
  "/protected",
  passport.authenticate("headerapikey", { session: false }),
  (req, res) => {
    res.status(200).json({ message: "You have access!", user: req.user });
  }
);

// Google Authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Facebook Authentication
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
