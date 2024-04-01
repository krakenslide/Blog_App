const PostModel = require("../models/post.model");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.content) {
    const error = new Error("Please fill all the required fields.");
    error.statusCode = 400; // Forbidden
    throw error;
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = await new PostModel({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    throw error;
  }
});

const test = asyncHandler(async (req, res) => {
  res.json({ message: "working" });
});

module.exports = { createPost, test };
