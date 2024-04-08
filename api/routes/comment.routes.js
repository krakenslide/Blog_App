const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  createComment,
  getComment,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getComment);

module.exports = router;
