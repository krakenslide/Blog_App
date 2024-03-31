const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const updateUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    const error = new Error("Not allowed to update user");
    error.statusCode = 403; // Forbidden
    throw error;
  }
  if (req.body.password) {
    if (req.body.password.length < 8) {
      const error = new Error("Password must be at least 8 characters");
      error.statusCode = 400; // Bad Request
      throw error;
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      const error = new Error("Username must be between 7 to 20 characters");
      error.statusCode = 400; // Bad Request
      throw error;
    }
    if (req.body.username.includes(" ")) {
      const error = new Error("Username cannot include space");
      error.statusCode = 400; // Bad Request
      throw error;
    }
    if (!req.body.username.match(/^[a-zA-Z0-9_-]+$/)) {
      const error = new Error("Username can only contain letters and numbers");
      error.statusCode = 400;
      throw error;
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true },
    );
    const { password: omitPassword, ...userData } = updatedUser.toObject();
    res.json(userData);
  } catch (error) {
    throw error;
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    const error = new Error("Not allowed to delete user");
    error.statusCode = 403; // Forbidden
    throw error;
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User has been deleted" });
  } catch (error) {
    throw error;
  }
});

module.exports = { updateUser, deleteUser };
