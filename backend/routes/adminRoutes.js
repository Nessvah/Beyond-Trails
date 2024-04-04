const express = require("express");
const router = express.Router();
const {
  registerManager,
  getAllManagers,
  deleteManagerById,
  getManagerById,
  updateManagerById,
  getManagerInfo,
  getFeedbacks,
} = require("../controllers/adminController");
const {
  validateSanitizeFormMiddleware,
} = require("../middleware/validationMiddleware");
const { validateManagerData } = require("../utils/validations");

const { authenticate, authorize } = require("../middleware/authMiddleware");
const { UserRole } = require("../helpers/enums");

router.use(authenticate);
router.use(authorize([UserRole.Admin]));

router.get("/managers", getAllManagers);

// get a specific manager by its id
router.get("/managers/:id", getManagerById);

// register the manager of a tourism district
router.post(
  "/managers",
  validateSanitizeFormMiddleware(validateManagerData),
  registerManager
);

// update the information about a specific manager
router.patch("/managers/:id", updateManagerById);

// delete manager by its id
router.delete("/managers/:id", deleteManagerById);

router.get("/feedbacks", getFeedbacks);

module.exports = {
  adminRoutes: router,
};
