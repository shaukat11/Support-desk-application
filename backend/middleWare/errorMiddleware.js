// Creating the Error Handler
const errorHandler = (err, req, res, next) => {
  const statusBhaya = res.statusCode ? res.statusCode : 500;
  res.status(statusBhaya);
  res.json({
    message: err.message,
    // for the display of error if file is production than no error or we will through the err.stack with list of errors
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
