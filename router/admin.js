const express = require("express");
const router = express.Router();
const passport = require("passport");
// const checkPermission = require('../middlewares/checkpermission.js')
const authorize = require("../middlewares/authorize");
const { loginUser, refreshAdminToken }= require('../controller/admin/auth/loginController.js') 
const { profile, deleteUser, updateUser }= require('../controller/web/user/userController.js')
const validateRequest= require('./../middlewares/validateRequest.js')
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
router.get('/get_all_users', authorize("get_all_users", "view"), getAllUsers)
router.get('/get_all_todos',authorize("get_all_todos", "view"), getAllTodos)
router.get('/get_user_todos/:id',authorize("get_user_todos", "view"), getUserTodos)


router.post('/todo',
  passport.authenticate('jwt', { session: false }),authorize("todo_post", "create"),
  validateRequest(todoSchema),
  addTodo)
router.delete('/todo/:id', passport.authenticate('jwt', { session: false }),authorize("todo_delete", "delete"), deleteTodo)
router.patch('/todo/:id',passport.authenticate('jwt', { session: false }),  authorize("todo_update", "update"), validateRequest(todoSchema), updateTodo)




const roleController = require("../controller/RoleController.js");
const resourceController = require("../controller/ResourceController.js");
const permissionController = require("../controller/permissionController.js");

router.get("/role", roleController.getRoles);
router.post("/role", roleController.createRole);


router.get("/resource", resourceController.getResources);
router.post("/resource", resourceController.createResource);


router.get("/permission", permissionController.getPermissions);
router.post("/permission", permissionController.createPermission);


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
