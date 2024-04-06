const CommentModel = require("../models/comment.model");
const asyncHandler = require("express-async-handler");

const createComment = asyncHandler(async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      const error = new Error("You are not allowed to comment.");
      error.status(403);
      throw error;
    }

    const newComment = new CommentModel({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
});

module.exports = { createComment };
