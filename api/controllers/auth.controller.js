const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

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

module.exports = { signup };
