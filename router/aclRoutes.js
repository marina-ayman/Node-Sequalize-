const express = require("express")   
const router = express.Router()   
const authorize = require("../middlewares/authorize")   
const adminPassport = require('passport')
require('../config/passport.js')(adminPassport)  
const { getRoleById, getAllRoles, deleteRole, updateRole, createRole , getResourcesData} = require('../controller/admin/RoleController')  

router.post('/roles', adminPassport.authenticate('jwt', { session: false }), authorize(['create_role']), 
 createRole)   
router.patch('/roles/:id', adminPassport.authenticate('jwt', { session: false }), authorize(['update_role']), 
 updateRole)   
router.delete('/roles/:id', adminPassport.authenticate('jwt', { session: false }),authorize(['delete_role']),
  deleteRole)   
router.get('/roles', adminPassport.authenticate('jwt', { session: false }),
  getAllRoles)   
router.get('/roles/:id', adminPassport.authenticate('jwt', { session: false }),
  getRoleById)   

  router.get('/getRoleData', adminPassport.authenticate('jwt', { session: false }),
  getResourcesData) 


module.exports = router   