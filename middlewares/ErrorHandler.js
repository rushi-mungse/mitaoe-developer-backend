const { ValidationError } = require("joi");
const HandleCustomError = require("../services/HandleCustomError");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  let data = {
    message: "Internal server error",
    ...(process.env.DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof HandleCustomError) {
    statusCode = err.statusCode;
    data = {
      message: err.message,
    };
  }

  res.status(statusCode).json(data);
};

module.exports = errorHandler;
