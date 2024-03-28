const express = require("express");
const {
  signup,
  signin,
  googleSignIn,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleSignIn);

module.exports = router;
