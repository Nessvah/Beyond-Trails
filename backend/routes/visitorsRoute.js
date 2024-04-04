const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {UserRole} = require('../helpers/enums');
const router = express.Router();

router.use(authenticate);
router.use(authorize([UserRole.Visitor]));

// @desc - Route for testing
// route - GET /api/visitors/
// @access - Visitors role

router.get("/", (req, res) => {
  // cookies set
  // we can get the user data from the req.user

  res.json({ msg: `Welcome ${req.user.name}` });
});

// @desc - Return data to show on digital passport
// route - GET /api/visitors/digital-passport
// @access - Visitors role

router.get("/digital-passport");

// @desc - Punctuation history
// route - GET /api/visitors/digital-passport
// @access - Visitors role

module.exports = {
  visitorsRoute: router,
};
