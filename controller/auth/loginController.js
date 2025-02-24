const jwt = require('jsonwebtoken')
// const User = require("../../models/User")
const CustomError = require('../../handler/customError')
require("dotenv").config()
const { User, RefreshToken } = require("../../models")

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
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
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
  // const token = jwt.sign(userExists.get({ plain: true }), process.env.SECRET_KEY , { expiresIn: '48h' });

  const token = await generateTokens(userExists);

  res.status(200).json({
    message: "User log in successfully",
    user: userExists,
    token: token
  })
} catch (err) {
  next(err); 
}
}

const refreshUserToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token is required" });
  }
  const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!storedToken) {
    return res.status(403).json({ message: "Invalid refresh - token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    const newTokens = await generateTokens(user);
    
   
      await RefreshToken.destroy({ where: { token: refreshToken }});
      await RefreshToken.create({
        token: newTokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
   

    res.json(newTokens);
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" ,error});
  }
};

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


module.exports = { loginUser, refreshUserToken, refreshAdminToken }
