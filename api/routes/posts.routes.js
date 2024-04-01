const express = require("express");
const { createPost, test } = require("../controllers/posts.controller");
const { verifyToken, isAdmin } = require("../utils/verifyUser");
const router = express.Router();

router.get("/", test);
router.post("/create", verifyToken, isAdmin, createPost);

module.exports = router;
