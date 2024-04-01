const notFound = (req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404).json({ error: error.message });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode == 200 ? 500 : err.statusCode;
  if (err.name === "MongoServerError" && err.code === 11000) {
    res.status = 400;
  } else {
    res.status(statusCode);
  }

  res.json({
    success: res.status === 200 ? true : false,
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { errorHandler, notFound };
