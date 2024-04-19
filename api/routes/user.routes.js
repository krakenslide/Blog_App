const {
  updateUser,
  deleteUser,
  getUsers,
  getUserForComments,
} = require("../controllers/user.controller");

const express = require("express");
const { verifyToken, isAdmin } = require("../utils/verifyUser");

const router = express.Router();

router.post("/getusers", verifyToken, isAdmin, getUsers);
router.get("/getuserpublicroute/:userId", getUserForComments);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/deleteuser/:id", verifyToken, deleteUser);

module.exports = router;
