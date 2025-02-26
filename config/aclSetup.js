const Acl = require("acl");
const { Sequelize } = require("sequelize");
const sequelize = require("./database");
const AclSequelizeBackend = require("acl-sequelize");
const acl = new Acl(new AclSequelizeBackend(sequelize, { prefix: "acl_" }));
async function setupACL() {
  try {
    // await sequelize.sync({ alter: true }); 
    console.log("✅ ACL tables recreated successfully!");
    await acl.allow([
      {
        roles: "admin",
        allows: [
          { resources: ["/users", "/admin"], permissions: ["get", "post", "delete"] },
        ],
      },
      {
        roles: "user",
        allows: [{ resources: ["/profile"], permissions: ["get", "put"] }],
      },
    ]);

    console.log("✅ACL Rules Set Successfully");
  } catch (error) {
    console.error("❌Error setting up ACL:", error);
  }
}

setupACL();

module.exports = acl;
