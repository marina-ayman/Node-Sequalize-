const express = require("express");
const router = express.Router();
const passport = require("passport");
const { loginUser }= require('../controller/auth/loginController.js') 
const { profile, deleteUser, updateUser }= require('../controller/web/user/userController.js')
const validateRequest= require('./../middlewares/validateRequest.js')
const { userSchema }= require('./../validations/userValidate.js')
const { getAllUsers, getAllTodos, getUserTodos }= require('../controller/admin/todoUserController.js')

// auth
router.post('/login', loginUser)

// user
router.get('/profile', passport.authenticate('jwt', { session: false }), profile)
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), deleteUser)
router.patch('/user/:id', validateRequest(userSchema),passport.authenticate('jwt', { session: false }), updateUser)

// todo
router.get('/get_all_users', getAllUsers)
router.get('/get_all_todos', getAllTodos)
router.get('/get_user_todos/:id', getUserTodos)



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
