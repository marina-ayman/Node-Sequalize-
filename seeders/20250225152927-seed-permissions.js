'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("acl_permissions", [

      { key: "admin:get_all_todos", value: "['view']"  },
      { key: "admin:todo_post", value: "['create']"  },
      { key: "admin:todo_delete", value: "['delete']"  },
      { key: "admin:todo_update", value: "['update']"  },
      
      { key: "admin:get_all_users", value: "['view']"  },
      { key: "admin:get_user_todos", value: "['view']"  },

      // User can only view todos
      { key: "user:get_all_todos", value: "['view']"  },
      { key: "user:get_user_todos", value: "['view']"  },

      { key: "superUser:get_all_todos", value: "['view']"  },
      { key: "superUser:todo_post", value: "['create']"  },

   
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acl_permissions", null, {});
  }
};