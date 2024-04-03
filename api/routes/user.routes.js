const {
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/user.controller");

const express = require("express");
const { verifyToken, isAdmin } = require("../utils/verifyUser");

const router = express.Router();

router.get("/getusers", verifyToken, isAdmin, getUsers);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/deleteuser/:id", verifyToken, deleteUser);

module.exports = router;
