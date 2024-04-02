const express = require("express");
const {
  createPost,
  test,
  getPosts,
} = require("../controllers/posts.controller");
const { verifyToken, isAdmin } = require("../utils/verifyUser");
const router = express.Router();

router.post("/create", verifyToken, isAdmin, createPost);
router.get("/getposts", getPosts);

module.exports = router;
