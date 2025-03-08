

const authorize = (requiredPermissions) => {
  return (req, res, next) => {

    if (!req.user || !req.user.permissions) {
      return res.status(403).json({ message: 'Forbidden: No permissions found' });
    }
 
    const hasPermission = requiredPermissions.some((permission) =>
      req.user.permissions.includes(permission)
    );
    if (hasPermission) {
      next(); 
    } else {
      return res.json({
        error: true,
        statusCode: 403,
        message: 'Forbidden: You do not have the required permission',
    })
    }
  };
};

module.exports = authorize;