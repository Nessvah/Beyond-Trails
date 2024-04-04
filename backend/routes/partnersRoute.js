const express = require("express");
const {
  validateSanitizeFormMiddleware,
} = require("../middleware/validationMiddleware");
const { authenticate } = require("../middleware/authMiddleware");
const {
  createPromotion,
  deleteOnePromotion,
  deleteManyPromotions,
  updatePromotion,
  updatePartnerInfo,
  // getFeedbacks,
  getAllFeedbacks,
  createFeedback,
  deleteFeedback,
  validarCodigoVisitante,
  consultarDesempenho,
  getBemVindo,
  putBemVindo,
  getAllPromotions,
  getOnePromotions,
  getPartnerById
} = require("../controllers/partnerController");

const router = express.Router();

const multer = require('multer');
const upload= multer({dest: 'uploads/'})
router.get("/", (req, res) => {
  res.json({ msg: "ok" });
});
// Rota para obter um parceiro pelo ID
router.get('/perfil/:partnerId', getPartnerById);

// Rota para inserir ou atualizar informações de parceiros
// router.put("/perfil/:partnerId", updatePartnerInfo);

router.put("/perfil/:partnerId", upload.single('image'), updatePartnerInfo);

// Rota para obter feedbacks
router.get("/feedback/:partnerId", getAllFeedbacks);

// Rota para apagar feedbacks
router.delete('/feedback/:id', deleteFeedback);

// Rota para um parceiro criar um feedback e enviá-lo ao gestor turístico

// router.post();

// Rota para um parceiro criar um feedback e enviá-lo ao gestor turístico
router.post(
  "/feedback/:id",
  createFeedback
);

//Rota para o parceiro validar o codigo promocional do meu visitante
router.post("/validar-codigo-visitante", validarCodigoVisitante);

//Rota para o parceiro consultar o desempenho das promocoes
router.get("/consultar-desempenho", consultarDesempenho);

// pedir historico do seu registo
router.get("/status-registo");

// Rota para obter os detalhes do parceiro com base no ID
router.get("/bem-vindo/:id", getBemVindo);

// Rota para atualizar os detalhes do parceiro com base no ID status pendente
router.put("/bem-vindo/:id", putBemVindo);

//rota get promocoes todas com base no id do parceiro
router.get('/promotions/:partnerId', getAllPromotions);


//rota get promocoes uma especifico 
router.get("/promotions-one/:id", getOnePromotions)

//rota para criacao de promoçoes
router.post('/promotions/:partnerId',upload.single('image'),  createPromotion);


//rota para as imagens
router.get('/uploads/:imageName', (req, res) => {
  const image = req.params.image;
  res.sendFile(`${__dirname}/uploads/${image}`);
});


//rota para apagar 1
router.delete("/promotion-DeleteOne/:id", deleteOnePromotion);

//rota para apagar 2 ou +
router.delete("/promotions", deleteManyPromotions);

//rota para atualizar
router.put("/promotions/:id", updatePromotion )

module.exports = {
  partnersRoute: router,
};
