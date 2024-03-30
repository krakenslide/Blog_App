const { updateUser, deleteUser } = require("../controllers/user.controller");

const express = require("express");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.put("/update/:id", verifyToken, updateUser);
router.delete("/deleteuser/:id", verifyToken, deleteUser);

module.exports = router;
