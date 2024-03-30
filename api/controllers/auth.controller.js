const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const signup = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email: email });
  try {
    if (!findUser) {
      const newUser = await User.create(req.body);
      res.json({ newUser, message: "User added successfully", success: true });
    } else {
      const error = new Error("Username already exists");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    throw error;
  }
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser || !(await findUser.isPasswordMatched(password))) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 400;
      throw error;
    }
    const accessToken = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: omitPassword, ...userData } = findUser.toObject();
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.json({
      success: true,
      findUser: userData,
      token: accessToken,
      message: "SignIn Successful",
    });
  } catch (error) {
    throw error;
  }
});

const googleSignIn = asyncHandler(async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: omitPassword, ...user } = user.toObject();
      res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .json(user);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: generatePassword,
        email: email,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: omitPassword, ...userData } = newUser.toObject();
      res
        .status(200)
        .cookie("accessToken", token, { http: true })
        .json(userData);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { signup, signin, googleSignIn };
