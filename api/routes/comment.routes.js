const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  createComment,
  getComment,
  likeComment,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getComment);
router.put("/likecomment/:commentId", verifyToken, likeComment);

module.exports = router;
