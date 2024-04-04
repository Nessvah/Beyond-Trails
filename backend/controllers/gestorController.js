const { Event } = require("../models/eventoSchema");
const { Parceiro } = require("../models/parceiroSchema");
const { PontoTuristico } = require("../models/pontosSchema");
const { partnerRole } = require("../helpers/enums");
const { HttpError } = require("../utils/HttpError");

async function getAllEvents(req, res) {
  try {
    const eventos = await Event.find();

    if (eventos.length > 0) {
      res.status(200).json({ response: "ok", data: eventos });
    } else {
      res
        .status(404)
        .json({ response: "error", errorMessage: "No events found" });
    }
  } catch (e) {
    res.status(500).json({ response: "error", errorMessage: e.message });
  }
}

const createEvent = async (req, res, next) => {
  console.log("file", req.files);

  const files = req.files;

  const imagesPaths = [];

  for (let i = 0; i < files.length; i++) {
    const obj = files[i];

    imagesPaths.push(obj.filename);
  }

  console.log(imagesPaths);

  try {
    const { nome, shortDescription, local, hora, bilhete } = req.body;

    const eventData = {
      nome,
      shortDescription,
      local,
      hora,
      bilhete,
      image: imagesPaths[0],
      cartazUrl: imagesPaths[1],
    };

    const createdEvent = await Event.create(eventData);

    console.log(createdEvent);

    if (createdEvent) {
      res.status(201).json({
        status: "success",
        data: [createdEvent],
        message: "Evento criado com sucesso!",
      });
    } else {
      return next(new HttpError("Erro ao criar o evento.", 500));
    }
  } catch (error) {
    console.error(error);
    return next(HttpError("Erro interno do servidor.", 500));
  }
};

/* async function createEvent(req, res) {
  const { nome, image, shortDescription, local, hora, bilhete, cartazUrl } = req.body;

  try {
    const event = await Event.create({
      nome,
      image,
      shortDescription,
      local,
      hora,
      bilhete,
      cartazUrl,
    });

    res.status(201).json({ response: "ok", data: [event] });
  } catch (e) {
    res.status(500).json({ response: "error", errorMessage: e.message });
  }
}
 */
async function updateEventById(req, res) {
  const eventoId = req.params.id;
  const { nome, image, shortDescription, local, hora, bilhete, cartazUrl } =
    req.body;

  const update = {
    nome,
    image,
    shortDescription,
    local,
    hora,
    bilhete,
    cartazUrl,
  };

  try {
    const result = await Event.findByIdAndUpdate(eventoId, update, {
      new: true,
    });

    if (result) {
      res.status(200).json({ status: "success", data: result });
      return;
    } else {
      res
        .status(404)
        .json({ response: "error", errorMessage: "Event not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ response: "error", errorMessage: e.message });
  }
}

async function deleteEventById(req, res) {
  const eventoId = req.params.id;

  try {
    const result = await Event.findByIdAndRemove(eventoId);

    if (result) {
      res.status(200).json({ response: "ok" });
    } else {
      res
        .status(404)
        .json({ response: "error", errorMessage: "Event not found" });
    }
  } catch (e) {
    res.status(500).json({ response: "error", errorMessage: e.message });
  }
}

async function getEventById(req, res) {
  try {
    const eventoId = req.params.id;
    const event = await Event.findById(eventoId).select({ __v: 0 });

    if (event) {
      res.status(200).json({ response: "ok", data: event });
    } else {
      res
        .status(404)
        .json({ response: "error", errorMessage: "Event not found" });
    }
  } catch (e) {
    res.status(500).json({ response: "error", errorMessage: e.message });
  }
}

async function getAllPts(req, res) {
  try {
    const pontos_tur = await PontoTuristico.find();
    if (pontos_tur) {
      res.status(200);
      res.json({ response: "ok", data: pontos_tur });
    }
  } catch (error) {
    res.status(400),
      res.json({ response: "error", errorMessage: error.message, data: null });
  }
}

async function getOnePt(req, res) {
  try {
    const PTId = req.params.ponto;
    const pT = await PontoTuristico.findById(PTId).select({
      __v: 0,
    });

    res.status(200);
    res.json({ response: "ok", data: pT });
  } catch (e) {
    res.status(400);
    res.json({ response: "error", errorMessage: e.message, data: null });
  }
}

async function createPt(req, res, next) {
  const files = req.files;

  const imagesPaths = [];

  for (let i = 0; i < files.length; i++) {
    const obj = files[i];

    imagesPaths.push(obj.filename);
  }

  try {
    const {
      local,
      morada,
      coordenadas,
      horario,
      descricao,
      telefone,
      telemovel,
      website,
      acessibilidade,
      qrcode,
      tipo,
      pontosAssociados,
    } = req.body;

    const ptData = {
      local,
      imgUrl: imagesPaths[0],
      morada,
      coordenadas,
      horario,
      descricao,
      telefone,
      telemovel,
      website,
      acessibilidade,
      qrcode,
      tipo,
      pontosAssociados,
    };

    const ptCreated = await PontoTuristico.create(ptData);

    console.log("const :", ptCreated);
    if (ptCreated) {
      res.status(201);
      res.json({ response: "ok", data: [ptCreated] });
    } else {
      return next(new HttpError("Erro ao criar o Ponto Turístico.", 500));
    }
  } catch (e) {
    res.status(400);
    res.json({ response: "error", errorMessage: e.message, data: null });
  }
}

async function updatePtbyID(req, res) {
  const PTId = req.params.ponto;

  const {
    local,
    imgUrl,
    morada,
    coordenadas,
    horario,
    descricao,
    telefone,
    telemovel,
    website,
    acessibilidade,
    qrcode,
    tipo,
    pontosAssociados,
  } = req.body;

  const update = {
    local,
    imgUrl,
    morada,
    coordenadas,
    horario,
    descricao,
    telefone,
    telemovel,
    website,
    acessibilidade,
    qrcode,
    tipo,
    pontosAssociados,
  };

  try {
    const result = await PontoTuristico.findByIdAndUpdate(PTId, {
      $set: update,
    });

    if (result) {
      res.status(200);
      res.json({ status: "success", data: [result] });
    }
  } catch (e) {
    res.status(400);
    res.json({ response: "error", data: `Error: ${e.message}` });
  }
}

async function deletePtbyID(req, res) {
  try {
    const PTId = req.params.ponto;

    const result = await PontoTuristico.findByIdAndRemove(PTId);
    res.json({ response: "ok" });
  } catch (error) {
    res.status(400);
    res.json({ response: "error", data: `Error: ${error.message}` });
  }
}

// mudar estado de aprovaçao de parceiro
const changePartnerApprovedStatus = async (req, res) => {
  const partnerId = req.body.partnerId;
  const status = req.body.status;

  try {
    if (status < 0 || status > 3) {
      message = "Valor de status não permitido!";
    }

    let message = "";

    switch (status) {
      case partnerRole.Aprovado:
        message = "Parceiro aprovado com sucesso.";
        break;
      case partnerRole.Rejeitado:
        message = "Parceiro rejeitado com sucesso.";
        break;
      case partnerRole.Analise:
        message = "Parceiro em análise.";
        break;
      default:
        message = "Estado do parceiro pendente.";
    }

    const updatedPartner = await Parceiro.findOneAndUpdate(
      { _id: partnerId },
      { isApproved: status },
      { new: true }
    );

    if (!updatedPartner) {
      return res.status(404).json({ message: "Parceiro não encontrado." });
    }

    return res.status(200).json({ message, partner: updatedPartner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao aprovar o parceiro." });
  }
};

const getVerifiedPartners = async (req, res) => {
  try {
    const verifiedPartners = await Parceiro.find({ isEmailVerified: true });
    res.json(verifiedPartners);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao encontrar parceiros com o email verificado." });
  }
};

module.exports = {
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
  changePartnerApprovedStatus,
  getVerifiedPartners,
};
