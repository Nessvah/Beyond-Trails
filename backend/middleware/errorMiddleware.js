const HttpError = require("../utils/HttpError");

/**
 * This error middleware handles cases where the requested endpoint doesn't
 * match any of our available routes, returning the generated error to the next
 * middleware triggering the error handling process.
 * @param req
 * @param res
 * @param next
 */
const notFound = (req, res, next) => {
  // this creates a new instance of the HttpError class, defining the
  // message that I want to send to the client and the error code
  const error = new HttpError(`Not found - ${req.originalUrl}`, 404);

  //sending it with next
  next(error);
};

const errorHandling = (error, req, res, next) => {
  // first, we need to check if the error comes from our notFound middleware
  // instanceof - check if an object belongs to a particular type or class
  if (error instanceof HttpError) {
    res.status(error.errCode);
    res.json({ message: error.message });
    return; // otherwise it will continue to the next action
  }

  // if not, we want to check what type of statusCode it has since we can
  // throw an error in our programs and still come with a 200-status code.
  // in that case, we alter it to 500, otherwise keeps its default code.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  // Mongo has a weird error that we can handle that here as well
  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found.";
  }

  res.status(error.statusCode || 500);
  // This property holds the stack trace of the error. The stack trace shows the sequence of
  // function calls and their locations that led to the error. However, for security and
  // privacy reasons, we don't want to expose the complete stack trace in a production environment
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandling,
};
