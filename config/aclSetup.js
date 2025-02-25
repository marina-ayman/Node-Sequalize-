const  Acl  = require('acl');
const AclSequelizeBackend = require('acl-sequelize');
const sequelize = require('./database'); 

// store permission 
const acl = new Acl(new AclSequelizeBackend(sequelize, { prefix: 'acl_' }));

(async () => {
    // make sure table existes
  await sequelize.sync(); 


  // Roles and Permissions
  await acl.allow('admin', '*', '*'); 
  await acl.allow('editor', 'todos', ['create', 'edit', 'delete']);
  await acl.allow('user', 'todos', ['view']);

  console.log(" Roles and Permissions Set");
})();

module.exports = acl;
