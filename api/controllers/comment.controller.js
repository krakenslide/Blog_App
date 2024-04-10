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

const getComment = asyncHandler(async (req, res, next) => {
  try {
    const comments = await CommentModel.find({
      postId: req.params.postId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

const likeComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      const error = new Error("Comment not found.");
      error.statusCode(404);
      throw error;
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

const editComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      const error = new Error("Comment not found.");
      error.statusCode(404);
      throw error;
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      const error = new Error("You are not allowed to edit this comment.");
      error.statusCode(403);
      throw error;
    }
    const editedComment = await CommentModel.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      {
        new: true,
      },
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
});

module.exports = { createComment, getComment, likeComment, editComment };
