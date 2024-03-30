const notFound = (req, res, next) => {
  const error = new Error(`Not found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode == 200 ? 500 : err.statusCode;
  res.status(statusCode);
  res.json({
    success: statusCode === 200 ? true : false,
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { errorHandler, notFound };
