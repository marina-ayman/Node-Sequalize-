const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const passport = require("passport");


const RoleController = require('../controller/admin/RoleController');
const ResourceController = require('../controller/admin/ResourceController');
const PermissionController = require('../controller/admin/permissionController.js');




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




authorize(['create_permission'])router.put('/permissions/:id', passport.authenticate('jwt', { session: false }), authorize(['update_permission']), PermissionController.updatePermission);
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


module.exports = router;