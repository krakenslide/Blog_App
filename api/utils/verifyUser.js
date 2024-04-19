const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    const error = new Error("Unauthorized (no token)").statusCode(403);
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Unauthorized");
      error.statusCode(403);
      throw error;
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    const error = new Error("Not an admin.");
    error.statusCode = 403; // Forbidden
    throw error;
  }
};

module.exports = { verifyToken, isAdmin };
