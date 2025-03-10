const express = require("express")   
const router = express.Router()   
const authorize = require("../middlewares/authorize")   
const adminPassport = require('passport')
require('../config/passport.js')(adminPassport)  
const { getRoleById, getAllRoles, deleteRole, updateRole, createRole , getResourcesData} = require('../controller/admin/RoleController')  

router.post('/roles', adminPassport.authenticate('UserJwt', { session: false }), authorize(['create_role']), 
 createRole)   
router.patch('/roles/:id', adminPassport.authenticate('UserJwt', { session: false }), authorize(['update_role']), 
 updateRole)   
router.delete('/roles/:id', adminPassport.authenticate('UserJwt', { session: false }),authorize(['delete_role']),
  deleteRole)   
router.get('/roles', adminPassport.authenticate('UserJwt', { session: false }),
  getAllRoles)   
router.get('/roles/:id', adminPassport.authenticate('UserJwt', { session: false }),
  getRoleById)   

  router.get('/getRoleData', adminPassport.authenticate('UserJwt', { session: false }),
  getResourcesData) 


module.exports = router   