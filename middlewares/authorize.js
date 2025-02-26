const { Permission, Resource, Role } = require("../models");

const checkPermission = async (roleKey, resourceKey, action) => {
  try {
    // البحث عن الـ Role في ACL
    const role = await Role.findOne({ where: { key: roleKey } });
    if (!role) return false;

    // البحث عن الـ Resource في ACL
    const resource = await Resource.findOne({ where: { key: resourceKey } });
    if (!resource) return false;

    // التحقق مما إذا كان الدور لديه الإذن المطلوب على المورد
    const permission = await Permission.findOne({
      where: { key: `${roleKey}:${resourceKey}` },
    });

    if (!permission) return false;

    const allowedActions = JSON.parse(permission.value); // تحويل الـ JSON إلى Array
    return allowedActions.includes(action);
  } catch (error) {
    console.error("Error checking ACL:", error);
    return false;
  }
};

const aclMiddleware = (resourceKey, action) => {
  return async (req, res, next) => {
    const roleKey = req.user?.role || "user"; // استخرج دور المستخدم

    const hasPermission = await checkPermission(roleKey, resourceKey, action);
    if (!hasPermission) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};

module.exports = aclMiddleware;
