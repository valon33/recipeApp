const AppError = require("../utils/appError");

const handleCastError = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateValues = (err) => {
  const value = err.ermsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleTokenError = () =>
  new AppError("You need to log in to perform this action.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Something went really wrong => =>", err);

    res.status(500).json({
      status: "error",
      message: "Something went really wrong 💥💥",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateValues(error);
    if (err.name === "UnauthorizedError") error = handleTokenError(error);

    sendErrorProd(error, res);
  }
};
