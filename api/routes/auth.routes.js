const express = require("express");
const {
  signup,
  signin,
  googleSignIn,
  signOut,
  cookieTest,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signout", signOut);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/cookietest", cookieTest);
router.post("/google", googleSignIn);

module.exports = router;
