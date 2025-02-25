const acl = require('../config/aclSetup');
const jwt = require('jsonwebtoken');
require("dotenv").config()



const verifyPermission = (resource, action) => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access Denied' });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    // permission 
    const isAllowed = await acl.isAllowed(userId, resource, action);
    if (!isAllowed) return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = verifyPermission;
