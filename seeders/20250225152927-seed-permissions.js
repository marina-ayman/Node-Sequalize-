// acl_permissions.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("acl_permissions", [
      {
        id: 1,
        role_id: 1,
        resource_id: 1,
        permissions: JSON.stringify(["view_todos"]),
       
      }, 
      {
        id: 2,
        role_id: 1,
        resource_id: 2,
        permissions: JSON.stringify(["view_users"]),
       
      },
      {
        id: 3,
        role_id: 1,
        resource_id: 1,
        permissions: JSON.stringify(["view_user_todos"]),
       
      }, // admin:get_all_todos
      {
        id: 4,
        role_id: 1,
        resource_id: 1,
        permissions: JSON.stringify(["create_todo", "delete_todo", "update_todo"]),
       
      }, // admin:todo

      {
        id: 5,
        role_id: 2,
        resource_id: 1,
        permissions: JSON.stringify(["view_todos"]),
      
      }, // user:get_all_todos
      {
        id: 6,
        role_id: 2,
        resource_id: 1,
        permissions: JSON.stringify(["view_user_todos"]),
       
      }, // user:get_user_todos

      {
        id: 7,
        role_id: 3,
        resource_id: 1,
        permissions: JSON.stringify(["view_todos"]),
      
      }, // user:get_all_todos
      {
        id: 8,
        role_id: 3,
        resource_id: 1,
        permissions: JSON.stringify(["create_todo"]),
       
      }, // superUser:todo
      {
        id: 9, 
        role_id: 1,
        resource_id: 3, 
        permissions: JSON.stringify(["create_role"]),
      
      },
      {
        id: 10,
        role_id: 1,
        resource_id: 3,
        permissions: JSON.stringify(["update_role"]),
   
      },
      {
        id: 11,
        role_id: 1,
        resource_id: 3,
        permissions: JSON.stringify(["delete_role"]),
  
      },
      {
        id: 12,
        role_id: 1,
        resource_id: 3,
        permissions: JSON.stringify(["view_roles"]),
   
      },
      {
        id: 13,
        role_id: 1,
        resource_id: 3,
        permissions: JSON.stringify(["view_role"]),
    
      },
    
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acl_permissions", null, {});
  },
};
