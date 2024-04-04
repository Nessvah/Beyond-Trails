const express = require("express");
const uploader = require("../middleware/uploadMiddleware");
const {
  registerVisitor,
  login,
  resetPassword,
  verifyEmailWithToken,
  resendEmailVerification,
  getAllEvents,
  getAllItineraries,
  getAllServices,
  getPontosTuristicosByTipo,
  getOnePontoTuristico,
  registerPartner,
  updatePassword,
  confirmResetPassword,
  updatePartnerProfile,
  resetPasswordVisitante,
  updateVisitorPerfil,
  getVisitorPerfil,
} = require("../controllers/usersController");

const {
  validateSanitizeFormMiddleware,
} = require("../middleware/validationMiddleware");

const {
  validateVisitorData,
  validateLoginData,
  validatePartnerData,
} = require("../utils/validations");

// const { upload } = require("../middleware/uploadMiddleware");

const path = require("path");

// import the specific controllers for this routes
const router = express.Router();

////////////////////////////////////////////////7
// GLOBAL ACCESS FOR USERS

router.get("/events", getAllEvents);

router.get("/itineraries", getAllItineraries);

router.get("/services", getAllServices);

router.get("/pontos_turisticos", getPontosTuristicosByTipo);

router.get("/pontos_turisticos/:cardId", getOnePontoTuristico);

////////////////////////////////////////////////
// REGISTRATION PROCESS / LOGIN / LOGOUT

// Register Visitor - PUBLIC ACCESS
router.post(
  "/",
  validateSanitizeFormMiddleware(validateVisitorData),
  registerVisitor
);
//rota temporaria para o registo do parceiro
router.get("/api/users/register-partner-form", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/registoParceiro.html"));
});

// Register Partner - PUBLIC ACCESS
//register partner
router.post(
  "/register-partner",
  uploader.fields([
    { name: "urlRepresentante", maxCount: 1 },
    { name: "urlTitularidade", maxCount: 1 },
  ]),
  validateSanitizeFormMiddleware(validatePartnerData),
  registerPartner
);

//register partner atualizar
router.put(
  "/register-partner/:id",
  validateSanitizeFormMiddleware(validatePartnerData),
  updatePartnerProfile
);
// Verify email
router.get("/verify-email/:id/:token", verifyEmailWithToken);

// Login
router.post("/login", validateSanitizeFormMiddleware(validateLoginData), login);

// router.use(authMiddleware)

// reset password
router.post("/reset-password", resetPassword);

router.put("/reset-password/:id", updatePassword);

// reset password verification
// /verify/:userId/:token
router.get("/reset-password/:id/:token", confirmResetPassword);

// Resend verification email
router.post("/resend-verification", resendEmailVerification);

// // reset passwordvisitante
// router.post("/reset-password-user/:id", resetPasswordVisitante);

// router.get("/editar-perfil/:id",  getVisitorPerfil );

// router.put("/editar-perfil/:id",  updateVisitorPerfil);

module.exports = {
  usersRoute: router,
};
