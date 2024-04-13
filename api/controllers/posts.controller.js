const PostModel = require("../models/post.model");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res, next) => {
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
    next(error);
  }
});

const deletePost = asyncHandler(async (req, res, next) => {
  try {
    const data = await PostModel.findOneAndDelete({ _id: req.params.id });
    if (!data) {
      const error = new Error("Error while deleting post.");
      error.statusCode = 403; // Forbidden
      throw error;
    }
    res.status(200).json({ message: "Post has been deleted." });
  } catch (error) {
    next(error);
  }
});

const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await PostModel.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await PostModel.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthPosts = await PostModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
});

const updatePost = asyncHandler(async (req, res, next) => {
  try {
    const getPost = await PostModel.findById(req.params.id);
    if (getPost.userId !== req.user.id) {
      const error = new Error("Not allowed to update this post.");
      error.statusCode = 403;
      throw error;
    }

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }, // This option returns the updated document
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

const fetchCategory = asyncHandler(async (req, res, next) => {
  try {
    const categories = await PostModel.aggregate([
      {
        $group: {
          _id: "$category", // Group by the category field
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the output
          category: "$_id", // Rename _id to category
        },
      },
    ]).then((categories) => {
      // categories will contain an array of unique categories
      res.json(categories);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  fetchCategory,
};
