const express = require("express");
const { verifyToken, isAdmin } = require("../utils/verifyUser");
const {
  createComment,
  getComment,
  likeComment,
  editComment,
  deleteComment,
  getCommentsDash,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcommentsdash", verifyToken, isAdmin, getCommentsDash);
router.get("/getcomments/:postId", getComment);
router.put("/likecomment/:commentId", verifyToken, likeComment);
router.put("/editcomment/:commentId", verifyToken, editComment);
router.delete("/deletecomment/:commentId", verifyToken, deleteComment);

module.exports = router;
