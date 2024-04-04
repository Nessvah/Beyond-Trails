const { Promotion } = require("../models/promotionSchema");
const { Parceiro } = require('../models/parceiroSchema');
const Feedback = require('../models/feedbackSchema'); // Importe o modelo Feedback corretamente
const { Visitor } = require("../models/visitorSchema");
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const HttpError = require('../utils/HttpError'); 
const asyncHandler = require("express-async-handler");

// @desc - obter informações de um parceiro por ID
// route - GET /perfil/:partnerId


const getPartnerById = async (req, res, next) => {
  const partnerId = req.params.partnerId; 

  try {

    const parceiro = await Parceiro.findById(partnerId);

    if (!parceiro) {
    
      const error = new HttpError('Parceiro não encontrado', 404);
      return next(error);
    }

  
    res.status(200).json({
      status: 'success',
      data: parceiro, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter os detalhes do parceiro' });
  }
};

// @desc - Create a new promotion
// route - POST /api/promotions
// @access - Private (only for authenticated users)


const createPromotion = async (req, res, next) => {

  const file = req.file;
  

  try {
    const {
      promotionName,
      description,
      requiredPoints,
      endDate,
      startDate,
    } = req.body;
    const partnerId = req.params.partnerId; 

    const parceiro = await Parceiro.findById(partnerId);
    
  console.log(parceiro, "este e o parceiro")
  console.log('partnerId:', partnerId);
    const promotionData = {
      promotionName,
      description,
      requiredPoints,
      endDate,
      startDate,
      image: file.filename,
      partnerId, 
      // image: `/uploads/${file.filename}`
    };

    const createdPromotion = await Promotion.create(promotionData);

    if (createdPromotion) {
      res.status(201).json({
        status: 'success',
        data: [createdPromotion],
        message: 'Promoção criada com sucesso!',
      });
    } else {
      return next(new HttpError('Erro ao criar a promoção.', 500));
    }
  } catch (error) {
    console.error(error);
    return next(new HttpError('Erro interno do servidor.', 500));
  }
};


// @desc - Delete a promotion by ID
// route - DELETE /api/promotion-DeleteOne/:id
// @access - Private (only for authenticated users)

const deleteOnePromotion = async (req, res, next) => {
  const promotionId = req.params.id;

  try {
  
    const promotion = await Promotion.findById(promotionId);


    if (!promotion) {
      const error = new HttpError('Promotion not found', 404);
      return next(error);
    }
   
    const result = await Promotion.findByIdAndDelete(promotionId);

    if (result) {
   
      res.status(200).json({ status: 'success', message: 'Promotion deleted' });
    } else {
     
      const error = new HttpError('Promotion not found', 404);
      return next(error);
    }
  } catch (error) {
    
    const httpError = new HttpError('An error occurred', 500);
    return next(httpError);
  }
};

// @desc - Delete várias promoções
// route - DELETE

const deleteManyPromotions = async (req, res, next) => {
  const promotionIds = req.body.ids; 
  const promotions = await Promotion.find({ _id: { $in: promotionIds } });

  if (promotions.length === 0) {
    const error = new HttpError('Promotions not found', 404);
    return next(error);
  }

  for (const promotion of promotions) {
    if (promotion.partnerId !== req.partnerId) {
      const error = new HttpError('You are not authorized to delete these promotions', 403);
      return next(error);
    }
  }

  const result = await Promotion.deleteMany({ _id: { $in: promotionIds } });

  if (result.deletedCount === 0) {
    const error = new HttpError('Promotions not found', 404);
    return next(error);
  }

  return res.status(200).json({ status: 'success', message: 'Promotions deleted' });
};

// @desc - Update a promotion by ID
// route - PUT /api/promotions/:id
// @access - Private (only for authenticated users)

const updatePromotion = async (req, res, next) => {
  const promotionId = req.params.id;

  try {
    const promotion = await Promotion.findById(promotionId);

    if (!promotion) {
      const error = new HttpError('Promotion not found', 404);
      return next(error);
    }

    if (req.body.promotionName) {
      promotion.set({ promotionName: req.body.promotionName });
    }

    if (req.body.description) {
      promotion.set({ description: req.body.description });
    }

    if (req.body.endDate) {
      promotion.set({ endDate: req.body.endDate });
    }

    if (req.body.startDate) {
      promotion.set({ startDate: req.body.startDate });
    }

    if (req.body.requiredPoints) {
      promotion.set({ requiredPoints: req.body.requiredPoints });
    }

    if (req.body.imageUrl) {
      promotion.set({ imageUrl: req.body.imageUrl });
    }

    if (req.body.qrCode) {
      promotion.set({ qrCode: req.body.qrCode });
    }

    const updatedPromotion = await promotion.save();

    res.status(200).json({ status: 'success', message: 'Promotion updated', data: updatedPromotion });
  } catch (error) {
    console.error('Error occurred while updating promotion:', error);
    const httpError = new HttpError('An error occurred', 500);
    return next(httpError);
  }
};

// @desc - Update partner Info
// route - PUT "api/partner/perfil/:partnerId"

// const updatePartnerInfo = async (req, res) => {
//   const partnerId = req.params.partnerId; 
//   const novosDados = req.body;

//   try {
//     const partnerInfo = await Parceiro.findByIdAndUpdate(
//       partnerId,
//       {
//         $set: novosDados,
//       },
//       {
//         new: true,
//       }
//     );

//     if (!partnerInfo) {
      
//       return res.status(404).json({ message: "Parceiro não encontrado" });
//     }

//     res.status(200).json({
//       message: "Informações do parceiro atualizadas com sucesso!",
//       parceiro: partnerInfo,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "Erro ao atualizar informações do parceiro" });
//   }
// };

const updatePartnerInfo = async (req, res) => {
  const partnerId = req.params.partnerId;
  const values = req.body; 

  if (req.file) {
    const image = req.file.path;
    values.urlImagem = image;
  }

  try {
    const partnerInfo = await Parceiro.findByIdAndUpdate(
      partnerId,
      {
        $set: {
          name: values.name,
          nif: values.nif,
          tipoEntidade: values.tipoEntidade,
          'endereco.morada': values.endereco.morada,
          'endereco.codigoPostal': values.endereco.codigoPostal,
          'endereco.cidade': values.endereco.cidade,
          'contacto.telefone': values.contacto.telefone,
          'contacto.telemovel': values.contacto.telemovel,
          'contacto.website': values.contacto.website,
          horario: values.horario,
          descricao: values.descricao,
          email: values.email,
          urlImagem: values.urlImagem,
          urlTitularidade: values.urlTitularidade,
          urlRepresentante: values.urlRepresentante
        },
      },
      { new: true }
    );

    if (!partnerInfo) {
      return res.status(404).json({ message: "Parceiro não encontrado" });
    }

    res.status(200).json({
      message: "Informações do parceiro atualizadas com sucesso!",
      parceiro: partnerInfo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar informações do parceiro" });
  }
};

// @desc - Delete partner feedback
// route - DELETE "api/partner/feedback/:id"

const deleteFeedback = async (req, res, next) => {
  const feedbackId = req.params.id;

  try {
    const deletedFeedback = await Feedback.findByIdAndRemove(feedbackId);

    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback não encontrado" });
    }

    res.json({ message: "Feedback removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao remover o feedback" });
  }
};

// @desc - Get partner feedback for Id 
// route - GET "api/partner/feedback/:partnerId"
const getAllFeedbacks = async (req, res, next) => {

  if (!req.params.partnerId) {
    return res.status(400).json({ message: 'ID do parceiro não fornecido' });
  }

  const partnerId = req.params.partnerId;

  try {
    const feedbacks = await Feedback.find({ partnerId: partnerId });

    res.status(200).json({ feedbacks }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar feedbacks' });
  }
};


// @desc - Post partner feedback for Id 
// route - Post "api/partner/feedback/:id"
const createFeedback = asyncHandler(async (req, res, next) => {
  const partnerId = req.params.id; 

  try {
    const partner = await Parceiro.findById(partnerId);

    if (!partner) {
      const error = new HttpError('Partner not found', 404);
      return next(error);
    }

    const { subject, description } = req.body;


    console.log('Partner ID:', partnerId);

    const newFeedback = new Feedback({
      partnerId: partner._id, 
      subject,
      description,
    });

   
    console.log('New Feedback Object:', newFeedback);

    await newFeedback.save();
    sendFeedbackToTourismAdmin(newFeedback);
    res.status(201).json({ message: 'Feedback created and sent to the tourism manager' });
  } catch (error) {
    return next(error);
  }
});


// @desc - Lógica para enviar feedback para o gerente de turismo
// route -
function  sendFeedbackToTourismAdmin(feedback) {

  console.log('Enviando feedback para o gerente de turismo:', feedback);
 
}

// @desc - validar um código QR de visitante
// route -
const validarCodigoVisitante = async (req, res, next) => {
  const { qrCode } = req.body;

  try {
    const visitor = await Visitor.findOne({ qrCode });

    if (!visitor) {
      return res.status(404).json({ message: 'Código QR não está associado a este visitante' });
    }

    res.status(200).json({ message: 'Código QR válido' });
  } catch (error) {
    return next(error);
  }
};


// @desc - consulta de desempenho
// route -
const consultarDesempenho = async (req, res, next) => {
  const promotionId = req.query.promotionId; 

  try {
    const promotion = await Promotion.findById(promotionId);

    if (!promotion) {
      const error = new HttpError('Promotion not found', 404);
      return next(error);
    }

    const numberOfVisitors = promotion.visitorsId.length;

    res.status(200).json({ numberOfVisitors });
  } catch (error) {
    const httpError = new HttpError('An error occurred', 500);
    return next(httpError);
  }
};

// @desc - seccao apos o registo, e verificacao de email do parceiro
// route -
const getBemVindo = async (req, res, next) => {
  try {
    const parceiroId = req.params.id; 
    const parceiro = await Parceiro.findById(parceiroId);

    if (!parceiro) {
      const error = new HttpError("Partner is not found!");
      return next(error);
    }
    res.status(200).json({ message: 'Detalhes do parceiro', parceiro });
  } catch (error) {
    console.error(error);
    const internalServerError = new HttpError("Internal server error");
    return next(internalServerError);
  }
};

// @desc - apos verificacao de email do parceiro ele ainda pode atualizar informaçoes 
// route -
const putBemVindo = async (req, res, next) => {
  try {
    const parceiroId = req.params.id;
    const novosDados = req.body;

    const parceiro = await Parceiro.findById(parceiroId);

    if (!parceiro) {
      const error = new HttpError("Parceiro não encontrado!", 404); 
      return next(error);
    }

   
    parceiro.set({
      name: novosDados.name,
      nif: novosDados.nif,
      'endereco.morada': novosDados.morada,
      'endereco.cidade': novosDados.cidade,
      'endereco.codigoPostal': novosDados.codigoPostal,
      email: novosDados.email,
      'contacto.telefone': novosDados.telefone,
      tipoEntidade: novosDados.tipoEntidade,
      urlTitularidade: novosDados.urlTitularidade,
      urlRepresentante: novosDados.urlRepresentante,
    });

    await parceiro.save();

    res.status(200).json({ message: 'Dados do parceiro atualizados com sucesso', parceiro });
  } catch (error) {
    console.error(error);

    const internalServerError = new HttpError("Erro interno do servidor", 500); 
  }
};

// @desc - Get a single promotion by ID
// route - GET /promotions-one/:id

const getOnePromotions = async (req, res, next) => {
  let promotionId = req.params.id.trim(); 

  try {
    const promotion = await Promotion.findById(promotionId);

    if (promotion) {
      console.log("Promotion found:", promotion);
      res.status(200).json({ status: 'success', data: promotion });
    } else {
      const error = new HttpError('Promotion not found', 404);
      return next(error);
    }
  } catch (error) {
    console.error("Error occurred while fetching promotion:", error);
    const httpError = new HttpError('An error occurred', 500);
    return next(httpError);
  }
};

// @desc - Get all promotion by id partner
// route - GET /promotions-one/:id

const getAllPromotions = async (req, res, next) => {
  const partnerId = req.params.partnerId; 

  try {

    const promotions = await Promotion.find({ partnerId }).catch((error) => {
      const httpError = new HttpError('An error occurred', 500);
      return next(httpError);
    });

    if (!promotions || promotions.length === 0) {
      return res.status(200).json({ message: 'No promotions found for this partner' });
    }

    res.status(200).json({ status: 'success', data: promotions });
  } catch (error) {
    console.error(error);
    return next(new HttpError('Internal server error', 500));
  }
};


module.exports = {
  createPromotion,
  deleteOnePromotion,
  deleteManyPromotions,
  updatePromotion,
  updatePartnerInfo,
  deleteFeedback,
  // getFeedbacks,
  getAllFeedbacks,
  createFeedback,
  validarCodigoVisitante,
  consultarDesempenho,
  getBemVindo,
  putBemVindo,
  getAllPromotions,
  getOnePromotions,
  getPartnerById,
  getAllFeedbacks

}