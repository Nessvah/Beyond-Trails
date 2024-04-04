const HttpError = require("../utils/HttpError");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authenticate = asyncHandler(async (req, res, next) => {
  // get the token from cookies
  const token = req.cookies.jwt;

  // check if the token is there or if it is valid
  if (!token) {
    const error = new HttpError("Not authenticated.", 401);
    return next(error);
  }

  // get all the decoded info from the token
  // set the user data that from the decoded token
  req.user = jwt.verify(token, process.env.JWT_SECRET);

  // if everything goes well, the user is authenticated
  next();
});

/**
 * This middleware function will check on the request obj for the user information, to check if the userType corresponds
 * to the roles that are authorized.
 * If they are, they go next otherwise, a denied access message will be sent and will not grant access to the
 * resources that they are trying to access
 * @param rolesAuthorized array with corresponding enum to grant access to.
 * @returns {(function(*, *, *): (*|undefined))|*}
 */
const authorize = (rolesAuthorized) => {
  // this will return middleware
  return (req, res, next) => {
    // get the type of user from the req that we set with the decoded token
    const { role } = req.cookies;

    // check if the userType(role) is not included on roles that are authorized
    // if it's not in there, deny access
    if (!rolesAuthorized.includes(Number(role))) {
      const error = new HttpError("Access denied.", 403);
      return next(error);
    }

    // otherwise it's authorized
    next();
  };
};

// Middleware to handle scope access control

module.exports = {
  authorize,
  authenticate,
};
