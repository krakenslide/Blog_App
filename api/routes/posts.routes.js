const express = require("express");
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  fetchCategory,
} = require("../controllers/posts.controller");
const { verifyToken, isAdmin } = require("../utils/verifyUser");
const router = express.Router();

router.get("/categories", fetchCategory);
router.put("/updatepost/:id", verifyToken, isAdmin, updatePost);
router.post("/create", verifyToken, isAdmin, createPost);
router.get("/getposts", getPosts);
router.delete("/deletepost/:id", verifyToken, isAdmin, deletePost);

module.exports = router;
