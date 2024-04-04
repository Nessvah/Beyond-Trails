const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Messages = require("../models/messagesSchema");

const crypto = require("crypto");
const HttpError = require("../utils/HttpError");
const { TourismManager } = require("../models/managerSchema");
const { Token } = require("../models/tokenSchema");
const { sendgridEmail } = require("../utils/email");
const email = require("../utils/email");

// Retrieve all the information from db
const getAllManagers = asyncHandler(async (req, res) => {
  const managers = await TourismManager.find({}).select({
    _id: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    tourismDistrict: 1,
    accountStatus: 1,
    imgUrl: 1,
  });

  res.json({ status: "success", data: managers });
});

// create a manager responsible for tourism in a district
const registerManager = asyncHandler(async (req, res, next) => {
  // get the data that comes from the form
  const managerData = req.body;

  // first, we need to check if there's already a user with that email
  const emailExists = await TourismManager.findOne({
    email: managerData.email,
  });

  if (emailExists) {
    const error = new HttpError("This email is already in use.", 409);
    return next(error);
  }

  // if it doesn't exist, we can create a new one manager
  const createdManager = await TourismManager.create(managerData);

  if (createdManager) {
    // I was having issues with daylight-saving time and server time.
    // Create a token with an expiration time of 2hour + from now
    // const expiration = new Date();
    // expiration.setHours(expiration.getHours() + 2);

    const name = `${createdManager.firstName} ${createdManager.lastName}`;
    const { _id, email, userType, accountStatus } = createdManager;
    // generate token
    // const token = await Token.create({
    //   userId: _id,
    //   token: crypto.randomBytes(32).toString("hex"),
    //   userType,
    //   expiresAt: expiration,
    // });
    // const userDataForEmail = { name, email, token };

    // TODO: fix the function to send the email
    // we need to send a verification email for the email provided
    // await sendgridEmail(userDataForEmail);

    const createdManagerInfo = {
      _id,
      firstName: createdManager.firstName,
      lastName: createdManager.lastName,
      email,
      tourismDistrict: createdManager.tourismDistrict,
      accountStatus: createdManager.accountStatus,
      imgUrl: createdManager.imgUrl,
    };

    res.status(201);
    res.json({
      status: "success",
      message:
        "Gestor criado e convite enviado por email. Aguarde confirmação do mesmo.",
      data: [createdManagerInfo],
    });
    return;
  }

  const error = new HttpError(
    "Ups. O recurso pretendido não foi encontrado.",
    400
  );
  return next(error);
});

// handle delete of the manager by its id
const deleteManagerById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const managerDeleted = await TourismManager.findByIdAndDelete(id);

  if (!managerDeleted) {
    res.status(404);
    res.json({
      status: "error",
      message: "Ups. O recurso que tentou eliminar não foi encontrado.",
    });
    return;
  }

  res.status(200);
  res.json({ status: "success", message: "Gestor removido com sucesso!" });
});

// get the data from a specific manager by its id
const getManagerById = asyncHandler(async (req, res, next) => {
  // get the managerid by the url params
  const managerId = req.params.id;

  //search for that manager in the db

  const manager = await TourismManager.findById(managerId).select({
    _id: 0,
    firstName: 1,
    lastName: 1,
    email: 1,
    nif: 1,
    address: 1,
    zip: 1,
    state: 1,
    tourismDistrict: 1,
    phoneNumber: 1,
  });

  if (manager) {
    res.status(200);
    res.json({ status: "success", data: [manager] });
    return;
  }

  const error = new HttpError("Gestor não encontrado.", 404);
  next(error);
});

const updateManagerById = asyncHandler(async (req, res, next) => {
  const managerId = req.params.id;
  const updatedData = req.body;
  const managerObjId = new mongoose.Types.ObjectId(managerId);

  const manager = await TourismManager.findOneAndUpdate(
    managerObjId,
    updatedData,
    { returnOriginal: true }
  );

  if (manager) {
    res.status(200);
    res.json({
      status: "success",
      message: "Informação do gestor atualizada com sucesso!",
      data: manager,
    });
    return;
  }

  const error = new HttpError(
    "Ups...O recurso para atualizar não foi encontrado.",
    404
  );
  next(error);
});

const getFeedbacks = asyncHandler(async (req, res, next) => {
  const results = await Messages.find({});

  if (results) {
    res.status(200);
    res.json({ status: "success", message: "", data: results });
    return;
  }

  res.status(404);
  res.json({ status: "success", message: "Resource not found", data: null });
});

module.exports = {
  getFeedbacks,
  registerManager,
  getAllManagers,
  deleteManagerById,
  getManagerById,
  updateManagerById,
};
