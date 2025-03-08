const jwt = require("jsonwebtoken");
// const User = require("../../models/User")
const CustomError = require("../../handler/customError");
require("dotenv").config();
const { RefreshToken } = require("../../models");
const WebUser= require('../../models/WebUser')

const generateTokens = async (user) => {
  const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: "50m" }
  );
  // const refreshToken = btoa(Math.random().toString())
  //   .substring(2)
  //   .repeat(48)
  //   .substring(0, 96);

  await RefreshToken.create({
    token: refreshToken,
    webUserId: user.id,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    // 7 * 24 * 60 * 60 * 1000
  });

  return { accessToken , refreshToken};
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError("All fields are required!", 400);
    }

    const userExists = await WebUser.findOne({ where: { email: email} });
    if (!userExists) {
      // const error = new Error("go to Sign IN")
      // error.statusCode = 401;
      // throw error
      throw new CustomError("Go To Sign-IN", 401);
    }
    const isMatch = await userExists.verifyPassword(password);
    if (!isMatch) {
      throw new CustomError("Wrong Email or Password", 401);
    }
    // const token = jwt.sign(userExists.get({ plain: true }), process.env.SECRET_KEY , { expiresIn: '48h' });

    const token = await generateTokens(userExists);

    res.status(200).json({
      message: "User log in successfully",
      user: userExists,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

const refreshUserToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new CustomError("Refresh token is required", 403);
  }
  const storedToken = await RefreshToken.findAll({
    where: { token: refreshToken },
  })
  if (!storedToken) {
    throw new CustomError("Invalid refresh token", 403);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const user = await WebUser.findByPk(decoded.id);

    if (!user) { 
      return res.status(403).json({ message: "User not found" });
    }
    const newTokens = await generateTokens(user);

    await RefreshToken.destroy({ where: { token: refreshToken } });
    await RefreshToken.create({
      token: newTokens.refreshToken, 
      webUserId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json(newTokens);
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token", error });
  }
};

module.exports = { loginUser, refreshUserToken };
