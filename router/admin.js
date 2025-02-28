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
const RoleController = require('../controller/admin/RoleController');
const ResourceController = require('../controller/admin/ResourceController');
const PermissionController = require('../controller/admin/permissionController.js');


// auth
router.post('/login', loginUser)
router.post("/admin-refresh-token", refreshAdminToken)


// user
router.get('/profile', passport.authenticate('jwt', { session: false }), profile)
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), deleteUser)
router.patch('/user/:id',passport.authenticate('jwt', { session: false }) , validateRequest(userSchema), updateUser)

// todo
router.get('/get_all_users', passport.authenticate('jwt', { session: false }), authorize(["view_users"]), getAllUsers)
router.get('/get_all_todos', passport.authenticate('jwt', { session: false }), authorize(["view_todos"]), getAllTodos)
router.get('/get_user_todos/:id', passport.authenticate('jwt', { session: false }),authorize(["admin:view_user_todos","user:view_user_todos"]), getUserTodos)


router.post('/todo',
  passport.authenticate('jwt', { session: false }),authorize(["create_todo"]),
  validateRequest(todoSchema),
  addTodo)
router.delete('/todo/:id', passport.authenticate('jwt', { session: false }),authorize(["delete_todo"]), deleteTodo)
router.patch('/todo/:id',passport.authenticate('jwt', { session: false }),  authorize(["update_todo"]), validateRequest(todoSchema), updateTodo)










router.post('/roles', passport.authenticate('jwt', { session: false }), authorize(['create_role']), RoleController.createRole);
router.put('/roles/:id', passport.authenticate('jwt', { session: false }), authorize(['update_role']), RoleController.updateRole);
router.delete('/roles/:id', passport.authenticate('jwt', { session: false }), authorize(['delete_role']), RoleController.deleteRole);
router.get('/roles', passport.authenticate('jwt', { session: false }), authorize(['view_roles']), RoleController.getAllRoles);
router.get('/roles/:id', passport.authenticate('jwt', { session: false }), authorize(['view_role']), RoleController.getRoleById);



router.post('/resources', passport.authenticate('jwt', { session: false }), authorize(['create_resource']), ResourceController.createResource);
router.put('/resources/:id', passport.authenticate('jwt', { session: false }), authorize(['update_resource']), ResourceController.updateResource);
router.delete('/resources/:id', passport.authenticate('jwt', { session: false }), authorize(['delete_resource']), ResourceController.deleteResource);
router.get('/resources', passport.authenticate('jwt', { session: false }), authorize(['view_resources']), ResourceController.getAllResources);
router.get('/resources/:id', passport.authenticate('jwt', { session: false }), authorize(['view_resource']), ResourceController.getResourceById);




router.post('/permissions', passport.authenticate('jwt', { session: false }), authorize(['create_permission']), PermissionController.createPermission);
router.put('/permissions/:id', passport.authenticate('jwt', { session: false }), authorize(['update_permission']), PermissionController.updatePermission);
router.delete('/permissions/:id', passport.authenticate('jwt', { session: false }), authorize(['delete_permission']), PermissionController.deletePermission);
router.get('/roles/:roleId/permissions', passport.authenticate('jwt', { session: false }), authorize(['view_permissions']), PermissionController.getPermissionsByRole);




router.get('/check-permission', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { permission } = req.query;
  if (req.user.permissions.includes(permission)) {
    res.json({ hasPermission: true });
  } else {
    res.status(403).json({ hasPermission: false });
  }
});





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
