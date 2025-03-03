const express = require("express")   
const router = express.Router()   
const authorize = require("../middlewares/authorize")   
const passport = require("passport")   
const { getRoleById, getAllRoles, deleteRole, updateRole, createRole , getResourcesData} = require('../controller/admin/RoleController')  

router.post('/roles', passport.authenticate('jwt', { session: false }), authorize(['create_role']), 
 createRole)   
router.put('/roles/:id', passport.authenticate('jwt', { session: false }), authorize(['update_role']), 
 updateRole)   
router.delete('/roles/:id', passport.authenticate('jwt', { session: false }),authorize(['delete_role']),
  deleteRole)   
router.get('/roles', passport.authenticate('jwt', { session: false }),  authorize(['view_roles']),
  getAllRoles)   
router.get('/roles/:id', passport.authenticate('jwt', { session: false }), authorize(['view_role']),
  getRoleById)   

  router.get('/getRoleData', passport.authenticate('jwt', { session: false }),
  getResourcesData) 


module.exports = router   