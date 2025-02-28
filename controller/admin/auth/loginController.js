const jwt = require('jsonwebtoken')
const CustomError = require('../../../handler/customError')
require("dotenv").config()
const { User, RefreshToken, Permission, Role, Resource } = require("../../../models")

const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { user },
    process.env.SECRET_KEY,
    { expiresIn: "30m" } 
  );

  // const refreshToken = jwt.sign(
  //   { id: user.id },
  //   process.env.REFRESH_SECRET,
  //   { expiresIn: "50m" } 
  // );
  const refreshToken = btoa(Math.random().toString()).substring(2).repeat(48).substring(0, 96);

  await RefreshToken.create({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 50 * 60 * 1000)
    // 7 * 24 * 60 * 60 * 1000
  });

  return { accessToken, refreshToken };
};


const loginUser = async (req, res, next) => {
  try {
  const { email, password } = req.body;
  if(!email || !password){
    throw new CustomError("All fields are required!", 400)
  }
  const userExists = await User.findOne({ where: { email } })
  if (!userExists){
      // const error = new Error("go to Sign IN") 
      // error.statusCode = 401;
      // throw error
      throw new CustomError("Go To Sign-IN", 401)
  }
  const isMatch = await userExists.verifyPassword(password)
  if(!isMatch) {
    throw new CustomError("Wrong Email or Password", 401)
  }
  const roleWithPermissions = await Role.findOne({
    where: { id: userExists.role_id },
    include: {
      model: Resource,
       as: 'resources',
      through: { attributes: ['permissions'] }, 
    },
  });


  const userPermissions = roleWithPermissions.resources
  .map((p) => JSON.parse(p.Permission?.permissions || '[]')) 
  .flat();

  // if (roleWithPermissions) {
  //   roleWithPermissions.resources.forEach((resource) => {
  //     console.log(`____________Resource ID: ${resource.id}, ___Permissions: ${resource.Permission.permissions}`);
  //   });
  // }

  const tokenData = {
    id: userExists.id,
    firstName: userExists.firstName,
    lastName: userExists.lastName,
    email: userExists.email,
    age: userExists.age,
    isAdmin: userExists.isAdmin,
    role_id: userExists.role_id,
    permissions: userPermissions,
  }

  // const token = jwt.sign(userExists.get({ plain: true }), process.env.SECRET_KEY , { expiresIn: '48h' });
  const token = await generateTokens(tokenData);

  res.status(200).json({
    message: "User log in successfully",
    user: tokenData,
    token: token
  })
} catch (err) {
  next(err); 
}
}

const refreshAdminToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ message: "Admin refresh token is required" });
  }
  const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!storedToken) {
    return res.status(403).json({ message: "Invalid admin refresh token" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user || user.isAdmin !== 1) {  
      return res.status(403).json({ message: "Admin user not found" });
    }
    const newTokens = await generateTokens(user);
      await RefreshToken.destroy({ where: { token: refreshToken } });
      await RefreshToken.create({
        token: newTokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json(newTokens);
  } catch (error) {
    res.status(403).json({ message: "Invalid admin refresh token" });
  }
};


module.exports = { loginUser, refreshAdminToken }
