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
      throw new Error("User Already Exists");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser || !(await findUser.isPasswordMatched(password))) {
      throw new Error("Invalid Credentials");
    }
    const accessToken = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1",
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
    throw new Error("Invalid Credentials");
  }
});

module.exports = { signup, signin };
