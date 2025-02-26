const acl = require("../config/aclSetup");

function checkPermission(resource, permission) {
  return async (req, res, next) => {
    try {
      const userRole = req.user && req.user.role ? req.user.role : "guest";
      const allowed = await new Promise((resolve, reject) => {
        acl.isAllowed(userRole, resource, permission, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (!allowed) {
        return res.status(403).json({ error: "Access Denied" });
      }

      next();
    } catch (error) {
      console.error("ACL Error:", error);
      return res.status(500).json({ error: "Server Error" });
    }
  };
}

module.exports = { checkPermission };
