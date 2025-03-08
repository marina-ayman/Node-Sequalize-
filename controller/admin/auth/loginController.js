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

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: "50m" } 
  );
  // const refreshToken = btoa(Math.random().toString()).substring(2).repeat(48).substring(0, 96);

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

  // const roleWithPermissions = await Role.findOne({
  //   where: { id: userExists.role_id },
  //   include: [
  //     {
  //       model: Resource,
  //       as: "resources",
  //       through: {
  //         attributes: ["permissions"], 
  //       },
  //     },
  //   ],
  // })
  const permissionsData = await Permission.findAll({
    where: { role_id: userExists.role_id },
    attributes: ["permissions"],
    raw: true, 
  })


  const permissions = permissionsData
  .map((perm) => JSON.parse(perm.permissions)) 
  .flat();

  const tokenData = {
    id: userExists.id,
    firstName: userExists.firstName,
    lastName: userExists.lastName,
    email: userExists.email,
    age: userExists.age,
    isAdmin: userExists.isAdmin,
    role_id: userExists.role_id,
    permissions: permissions,
  }

  // const token = jwt.sign(userExists.get({ plain: true }), process.env.SECRET_KEY , { expiresIn: '48h' });
  const token = await generateTokens(tokenData);

  res.status(200).json({
    message: "User log in successfully",
    user: tokenData,
    token: token,
  })
  
} catch (err) {
  next(err); 
}
}

const refreshAdminToken = async (req, res, next) => {
  const { refreshToken } = req.body; 
  if (!refreshToken) {
    throw new CustomError("Admin refresh token is required", 403)
  }
 
  const storedToken = await RefreshToken.findAll({ where: { token: refreshToken } });
  if (!storedToken) {
    throw new CustomError("Invalid admin refresh token", 406)
  }
  console.log('--------------------',storedToken) 

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user || user.isAdmin !== 1) {  
      throw new CustomError("Admin user not found", 403)
    }
    const newTokens = await generateTokens(user);
      await RefreshToken.destroy({ where: { token: refreshToken , userId: user.id} });
      await RefreshToken.create({
        token: newTokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

   return res.json(newTokens);
  } catch (error) {
    // throw new CustomError("Invalid admin refresh token", 403)
    next(error)
  }
};


module.exports = { loginUser, refreshAdminToken }
