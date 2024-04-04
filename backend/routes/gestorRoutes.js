const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllEvents,
  createEvent,
  updateEventById,
  deleteEventById,
  getEventById,
  getOnePt,
  getAllPts,
  createPt,
  updatePtbyID,
  deletePtbyID,
  getAllSts,
  deleteStbyID,
  changePartnerApprovedStatus,
  getVerifiedPartners,
} = require("../controllers/gestorController");

//rota para as imagens
router.get("/uploads/:imageName", (req, res) => {
  const image = req.params.image;
  console.log(image);
  res.sendFile(`${__dirname}/uploads/${image}`);
});

const uploads = multer({ dest: "uploads/" });

router.get("/uploads/:ptImageName", (req, res) => {
  const image = req.params.imgUrl;

  res.sendFile(`${__dirname}/uploads/${image}`);
});

//EVENTOS
//endpoint p eventos
router.get("/eventos", getAllEvents);

router.post("/eventos", uploads.any(), createEvent);
/* router.post("/eventos", createEvent); */

//endpoint atualizar evento
router.put("/eventos/:id", updateEventById);

//endpoint p apagar evento
router.delete("/eventos/:id", deleteEventById);

//endpoint p apresentar evento por id
router.get("/eventos/:id", getEventById);

//PONTOS TURÍSTICOS
//endpoint para apresentar um PT
router.get("/pontos_turisticos/:ponto", getOnePt);

//endpoint que apresenta todos os Pontos Turísticos na BD
router.get("/pontos_turisticos", getAllPts);

//endpoint para criar um novo Ponto Turístico
router.post("/pontos_turisticos", uploads.any(), createPt);

//endpoint para editar um Ponto Turístico
router.put("/pontos_turisticos/:ponto", updatePtbyID);

//endpoint para apagar um Ponto Turístico
router.delete("/pontos_turisticos/:ponto", deletePtbyID);

//SERVIÇOS TURÍSTICOS
// Rota para aprovar um parceiro
router.post("/approve", changePartnerApprovedStatus);
router.get("/approve", getVerifiedPartners);

module.exports = {
  gestorRoutes: router,
};
