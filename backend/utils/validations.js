const JoiImport = require("joi");
const JoiDate = require("@joi/date");
const Joi = JoiImport.extend(JoiDate);

const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
/**
 * This function will validate and sanitize the form data submitted by the user
 * in the visitor form.
 * @param userData - the form data that the user sends to the backend
 * @returns {*} - if there's any error on the process of validation or sanitizing,
 * joi will send the error into the outer middleware otherwise will return the cleaned data.
 */
const validateVisitorData = (userData) => {
  const schema = Joi.object({
    // validate data passed
    name: Joi.string().trim().min(3).max(30),
    password: Joi.string().pattern(new RegExp(passwordPattern)).min(8),
    repeatPassword: Joi.ref("password"),
    email: Joi.string().email(),
    isSubscribed: Joi.boolean(),
    gender: Joi.string().trim(),
    dateOfBirth: Joi.date()
      .format("DD/MM/YYYY") // set a desired date format here
      .raw(),
    city: Joi.string().min(3).max(30).trim(),
  });

  return schema.validate(userData);
};

const validateLoginData = (userData) => {
  const schema = Joi.object({
    password: Joi.string().pattern(new RegExp(passwordPattern)).min(8).trim(),
    repeatPassword: Joi.ref("password"),
    email: Joi.string().email(),
  });

  return schema.validate(userData);
};

//////////////////////////////////////////

// we need to make something like a map to find which collection to query
const resourcesToModels = {
  type1: "reviews",
  type2: "points-history",
  type3: "digital-passport",
};

const validateResourceAccess = async (resourceType, resourceId, userId) => {
  // get the type of model
  const ModelToQuery = resourcesToModels[resourceType];

  // if that model doesn't exist in the mapping collection
  if (!ModelToQuery) {
    throw new Error("Resource type invalid.");
  }

  // if it exists, we need to check if belongs to the use that is requesting it
  try {
    // req.user --- req.user.userId ?
    const requestedResource = await ModelToQuery.findOne({
      _id: resourceId,
      userId,
    });

    return !!requestedResource; // this turns the object into a boolean type with its boolean value accordingly
  } catch (e) {
    // that user can't access because that resource doesn't belong to him or doesn't exist
    return false;
  }
};

// validação para os dados do parceiro
const validatePartnerData = (partnerData) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(30),
    nif: Joi.string().required(),
    tipoEntidade: Joi.string().required(),
    endereco: Joi.object({
      morada: Joi.string().trim().required(),
      codigoPostal: Joi.string().trim().required(),
      cidade: Joi.string().trim().required(),
    }),
    contacto: Joi.object({
      telefone: Joi.string().trim().required(),
      telemovel: Joi.string().trim(),
      website: Joi.string().trim(),
    }),
    horario: Joi.string().trim(),
    descricao: Joi.string().trim(),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp(passwordPattern)).min(8),
    urlImagem: Joi.string().trim(),
    urlTitularidade: Joi.string().trim(),
    urlRepresentante: Joi.string().trim(),
    isEmailVerified: Joi.boolean(),
  });

  return schema.validate(partnerData);
};


const validatePromotionData = (promotionData) => {
  const schema = Joi.object({
    visitorsId: Joi.array().items(Joi.string()), // ou Joi.array().items(Joi.objectId()) se for um ObjectId
    partnerId: Joi.string(), // ou Joi.objectId() se for um ObjectId
    promotionName: Joi.string().required(),
    description: Joi.string().required(),
    endDate: Joi.date().required(),
    startDate: Joi.date(),
    requiredPoints: Joi.number().required(),
    imageUrl: Joi.string().required(),
    qrCode: Joi.string().required(),
  });

  return schema.validate(promotionData);
};

const validateFeedbackData = (feedbackData) => {
  const schema = Joi.object({
    subject: Joi.string().required(),
    description: Joi.string().required(),
  });

  return schema.validate(feedbackData);
};

/*
  Validate the manager data */

const validateManagerData = (data) => {
  const schema = Joi.object({
    // validate data passed
    firstName: Joi.string().trim().min(3).max(30),
    lastName: Joi.string().trim().min(3).max(30),
    password: Joi.string().min(8),
    email: Joi.string().email(),
    nif: Joi.number().min(9),
    address: Joi.string().min(3),
    state: Joi.string().min(3),
    zip: Joi.string().min(3),
    phoneNumber: Joi.string().min(9),
    tourismDistrict: Joi.string().min(3),
  });

  return schema.validate(data);
};

module.exports = {
  validateVisitorData,
  validateLoginData,
  validateResourceAccess,
  validatePartnerData,
  validatePromotionData,
  validateFeedbackData,
  validateManagerData,
};
