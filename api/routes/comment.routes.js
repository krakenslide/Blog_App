const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  createComment,
  getComment,
  likeComment,
  editComment,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getComment);
router.put("/likecomment/:commentId", verifyToken, likeComment);
router.put("/editcomment/:commentId", verifyToken, editComment);

module.exports = router;
