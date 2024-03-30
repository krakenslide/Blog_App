const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new Error("Unauthorized");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new Error("Unauthorized");
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
