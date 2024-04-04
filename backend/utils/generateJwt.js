const jwt = require("jsonwebtoken");

const generateJwt = (userId, role, name) => {
  // create token - what we need in the payload - userId to be able to identify each user and the userType
  // then, we provide a secret, and after that we can specify some options like expiration time
  return jwt.sign({ userId, role, name }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateJwt;
