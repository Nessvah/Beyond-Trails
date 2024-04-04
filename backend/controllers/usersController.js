const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const HttpError = require("../utils/HttpError");
const Visitor = require("../models/visitorSchema");
const { Parceiro } = require("../models/parceiroSchema");
const { Promotion } = require("../models/promotionSchema");
const { Event } = require("../models/eventoSchema");
const Admin = require("../models/adminSchema");
const { Token } = require("../models/tokenSchema");
const { sendgridEmail, resetPwdEmail } = require("../utils/email");
const generateJwt = require("../utils/generateJwt");
const multer = require("multer");
const { encryptPassword } = require("../utils/hashPassword");
const { PontoTuristico } = require("../models/pontosSchema");
const { UserRole } = require("../helpers/enums");
const { TourismManager } = require("../models/managerSchema");

// @desc - Register visitor/ send token for email validation / set jwt
// route - POST /api/users/
// @access - Public - everyone can register

const registerVisitor = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // first, we need to check if there's already a user with that email
  const emailExists = await Visitor.findOne({ email });

  if (emailExists) {
    const error = new HttpError("This email is already in use.", 400);
    return next(error);
  }

  // if it doesn't exist, we can create a new one
  const userData = req.body;

  const visitor = await Visitor.create(userData);

  if (visitor) {
    // I was having issues with daylight-saving time and server time.
    // Create a token with an expiration time of 2hour + from now
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 2);

    const { _id, name, email, role } = visitor;
    // generate token
    const token = await Token.create({
      userId: _id,
      token: crypto.randomBytes(32).toString("hex"),
      role,
      expiresAt: expiration,
    });
    const userDataForEmail = { name, email, token };

    // we need to send a verification email for the email provided
    await sendgridEmail(userDataForEmail);

    // generate jwt token
    const accessToken = generateJwt(_id, role);

    res.status(201);
    res.json({
      status: "success",
      message:
        "visitor created successfully and verification email sent." +
        " Please verify your email account.",
      data: { _id, name, email, accessToken, role },
    });
  } else {
    const error = new HttpError("Invalid data.", 400);
    return next(error);
  }
});

// const registerPartner = async (req, res, next) => {
//   const { name, nif, email, password, tipoEntidade, endereco, contacto } =
//     req.body;

//   const { morada, cidade, codigoPostal } = endereco;
//   const { telefone } = contacto;

//   const emailExists = await Parceiro.findOne({ email });

//   if (emailExists) {
//     const error = new HttpError(
//       "An account with this email address already exists..",
//       400
//     );
//     return next(error);
//   }

//   const parceiro = await Parceiro.create({
//     name,
//     nif,
//     tipoEntidade,
//     endereco: {
//       morada,
//       codigoPostal,
//       cidade,
//     },
//     contacto: {
//       telefone,
//     },
//     email,
//     password,
//   });
// if (emailExists) {
//   const error = new HttpError(
//     "An account with this email address already exists..",
//     400
//   );
//   return next(error);
// }

// const parceiro = await Parceiro.create({
//   name,
//   nif,
//   tipoEntidade,
//   endereco: {
//     morada,
//     codigoPostal,
//     cidade,
//   },
//   contacto: {
//     telefone,
//   },
//   email,
//   password,
// });

//   console.log(parceiro);

//   if (parceiro) {
//     const expiration = new Date();
//     expiration.setHours(expiration.getHours() + 2);

//     const { _id, name, email, userType } = parceiro;
//     // generate token
//     const token = await Token.create({
//       userId: _id,
//       token: crypto.randomBytes(32).toString("hex"),
//       expiresAt: expiration,
//       userType,
//     });
//     const userDataForEmail = { name, email, token };

//     console.log("userDataForEmail:", userDataForEmail);
//     await sendgridEmail(userDataForEmail);

//     const accessToken = generateJwt(_id, userType);

// console.log("userDataForEmail:", userDataForEmail);
// await sendgridEmail(userDataForEmail);

// const accessToken = generateJwt(_id, userType);

//     res.status(201);
//     res.json({
//       status: "success",
//       message:
//         "Partner created successfully and verification email sent." +
//         " Please verify your email account.",
//       data: { _id, name, email, accessToken, userType },
//     });
//   } else {
//     const error = new HttpError("Invalid data.", 400);
//     return next(error);
//   }
// };
const registerPartner = async (req, res, next) => {
  try {
    const {
      name,
      nif,
      email,
      password,
      tipoEntidade,
      endereco,
      contacto,
      urlTitularidade,
      urlRepresentante,
    } = req.body;

    const { morada, codigoPostal, cidade } = endereco;

    const { telefone } = contacto;

    const emailExists = await Parceiro.findOne({ email });

    if (emailExists) {
      const error = new HttpError(
        "An account with this email address already exists.",
        400
      );
      return next(error);
    }

    const parceiro = await Parceiro.create({
      name,
      nif,
      tipoEntidade,
      endereco: {
        morada,
        codigoPostal,
        cidade,
      },
      contacto: {
        telefone,
      },
      email,
      password,

      urlTitularidade,
      urlRepresentante,
    });

    if (parceiro) {
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 2);

      const token = await Token.create({
        userId: parceiro._id,
        token: crypto.randomBytes(32).toString("hex"),
        expiresAt: expiration,
        userType: parceiro.userType,
        role: UserRole.Partner,
      });
      const userDataForEmail = { name, email, token, id: parceiro._id };

      if (
        req.files &&
        req.files.representanteLegal &&
        req.files.representanteLegal[0]
      ) {
        const representanteFile = req.files.representanteLegal[0];
        console.log("Representante Legal File:", representanteFile);
        const representanteURL = representanteFile.filename;
        parceiro.urlRepresentante = representanteURL;
      }

      if (
        req.files &&
        req.files.documentoComprovativo &&
        req.files.documentoComprovativo[0]
      ) {
        const titularidadeFile = req.files.documentoComprovativo[0];
        const titularidadeURL = titularidadeFile.filename;
        parceiro.urlTitularidade = titularidadeURL;
      }

      await parceiro.save();

      await sendgridEmail(userDataForEmail);

      const accessToken = generateJwt(parceiro._id, parceiro.userType);

      res.status(201).json({
        status: "success",
        message:
          "Partner created successfully and verification email sent. Please verify your email account.",
        data: {
          _id: parceiro._id,
          name: parceiro.name,
          email: parceiro.email,
          accessToken,
          userType: parceiro.userType,
        },
      });
    } else {
      const error = new HttpError("Invalid data.", 400);
      return next(error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

//logica para o parceiro atualizar as suas informaçoes
const updatePartnerProfile = async (req, res, next) => {
  try {
    const partnerId = req.user._id;

    const {
      name,
      nif,
      email,
      password,
      tipoEntidade,
      endereco,
      contacto,
      urlTitularidade,
      urlRepresentante,
    } = req.body;

    const partner = await Parceiro.findById(partnerId);

    if (!partner) {
      const error = new HttpError("Partner not found.", 404);
      return next(error);
    }

    const isPasswordValid = await partner.comparePassword(
      req.body.currentPassword
    );

    if (!isPasswordValid) {
      const error = new HttpError("Senha atual incorreta.", 401);
      return next(error);
    }

    if (name) partner.name = name;
    if (nif) partner.nif = nif;
    if (email) partner.email = email;
    if (password) partner.password = password;
    if (tipoEntidade) partner.tipoEntidade = tipoEntidade;
    if (endereco) partner.endereco = endereco;
    if (contacto) partner.contacto = contacto;
    if (urlTitularidade) partner.urlTitularidade = urlTitularidade;
    if (urlRepresentante) partner.urlRepresentante = urlRepresentante;

    await partner.save();

    res.json({ message: "Perfil do parceiro atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Falha ao atualizar o perfil do parceiro." });
  }
};

// @desc - Authenticate user
// route - POST /api/users/login
// @access - Private - auth users

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // since we have one collection for each user we need to look into each one
  const managers = TourismManager.findOne({ email });
  const partners = Parceiro.findOne({ email });
  const visitors = Visitor.findOne({ email });
  const admins = Admin.findOne({ email });

  // now we use promise all to get the results from those queries
  const results = await Promise.allSettled([
    partners,
    visitors,
    admins,
    managers,
  ]);

  // results is going to give us an array will objects fullfilled or not,
  // and we need to know which one is not null so, if they have some result

  let user = null;

  for (const obj of results) {
    // see if the obj has a value that is not null

    if (obj.value) {
      // if there is some obj that has value then it found a user
      user = obj.value;
    }
  }

  if (!user) {
    const error = new HttpError("Credenciais inválidas.", 401);
    return next(error);
  }

  if (!user.isEmailVerified) {
    const error = new HttpError("You need to verify your email first.", 401);
    return next(error);
  }

  if (user.role == UserRole.Partner && user.isApproved == "... pendente") {
    const error = new HttpError("Aguarde que a conta seja aprovada.", 401);
    return next(error);
  }
  // admin has a different login and password flow since it was created first
  // on the database so on the first Login the password is still a pre defined one
  // and its not encrypted, so we need to handle that
  if (user.role == UserRole.Admin && user.firstLogin) {
    const accessToken = generateJwt(user._id, user.userType, user.name);

    res.cookie("jwt", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", // set the secure to true if in production mode but not in development
      domain: "localhost",
      sameSite: "Lax",
    });

    res.status(200).json({
      status: "success",
      message: "Precisa alterar palavra-passe no primeiro login.",
      authenticated: true,

      data: [
        {
          userId: user._id,
          name: user.name,
          accessToken,
          role: user.role,
          firstLogin: user.firstLogin,
        },
      ],
    });
    return;
  }

  if (await user.matchPasswords(password)) {
    console.log("pwds mathc");
    const accessToken = generateJwt(user._id, user.userType, user.name);

    /**
     * The sameSite and domain attributes are set to ensure that the client browser does not
     * reject our cookies due to CORS or other security protocol issues.
     */
    res.cookie("jwt", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", // set the secure to true if in production mode but not in development
      domain: "localhost",
      sameSite: "Lax",
    });

    res.status(200).json({
      status: "success",
      message: "Login efetuado com sucesso.",
      authenticated: true,
      data: [
        {
          userId: user._id,
          name: user.name,
          accessToken,
          role: user.role,
        },
      ],
    });
    return;
  }
});

// @desc - Reset password
// route - POST /api/users/reset-password
// @access - Public - everyone can access

const resetPassword = asyncHandler(async (req, res) => {
  // we will receive the email from the client
  const userEmail = req.body.email;

  // check if the email exists, if it does, send an email else
  // we don't do nothing
  const managers = TourismManager.findOne({ email: userEmail });
  const partners = Parceiro.findOne({ email: userEmail });
  const visitors = Visitor.findOne({ email: userEmail });
  const admins = Admin.findOne({ email: userEmail });

  // now we use promise all to get the results from those queries
  const results = await Promise.allSettled([
    partners,
    visitors,
    admins,
    managers,
  ]);
  // results is going to give us an array will objects fullfilled or not,
  // and we need to know which one is not null so, if they have some result

  let emailExists = null;

  for (const obj of results) {
    // see if the obj has a value that is not null

    if (obj.value) {
      // if there is some obj that has value then it found a user
      emailExists = obj.value;
    }
  }

  if (emailExists) {
    // I was having issues with daylight-saving time and server time.
    // Create a token with an expiration time of 2hour + from now
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 2);

    const { _id, name, email, role } = emailExists;
    // generate token
    const token = await Token.create({
      userId: _id,
      token: crypto.randomBytes(32).toString("hex"),
      role,
      expiresAt: expiration,
    });
    console.log(token);
    const userDataForEmail = { name, email, token, _id };

    // we need to send a verification email for the email provided
    await resetPwdEmail(userDataForEmail);
  }

  res.status(200);

  res.json({
    status: "success",
    message:
      "Se o email existir, enviaremos um email para confirmar a alteração da password.",
  });
});

const confirmResetPassword = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const token = req.params.token;

  // check if the token is valid or if still exist
  const isTokenValid = await Token.findOne({ userId, token });

  // check if the user exists
  const managers = TourismManager.findById(userId);
  const partners = Parceiro.findById(userId);
  const visitors = Visitor.findById(userId);
  const admins = Admin.findById(userId);

  // now we use promise all to get the results from those queries
  const results = await Promise.allSettled([
    partners,
    visitors,
    admins,
    managers,
  ]);
  // results is going to give us an array will objects fullfilled or not,
  // and we need to know which one is not null so, if they have some result

  let userExists = null;

  for (const obj of results) {
    // see if the obj has a value that is not null

    if (obj.value) {
      // if there is some obj that has value then it found a user
      userExists = obj.value;
    }
  }

  // if the user doesn't exist, send error msg
  if (!userExists || !isTokenValid) {
    const error = new HttpError("Link inválido", 400);
    return next(error);
  }

  res.status(200);
  res.json({
    status: "success",
    message: "pode alterar palavra-passe",
    data: null,
  });
});

// @desc - Verify email/
// route - POST /api/users/verify/:id/:token
// @access - Private - only authenticated users(through token) can verify their email

const verifyEmailWithToken = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const token = req.params.token;

  // check if the token is valid or if still exist
  const isTokenValid = await Token.findOne({ userId, token });

  if (!isTokenValid) {
    // if already expired or doesn't match with the user id provided
    const error = new HttpError("Invalid link", 400);
    return next(error);
  }

  if (isTokenValid.role === UserRole.Visitor) {
    // check if the user exists
    const userExists = await Visitor.findOne({ _id: userId });

    // if the user doesn't exist, send error msg
    if (!userExists) {
      const error = new HttpError("Invalid link", 400);
      return next(error);
    }

    // if everything is correct, we can then verify the user email and delete the token from the db
    await Visitor.findByIdAndUpdate(userId, { isEmailVerified: true });
    await Token.deleteOne(isTokenValid);

    res.status(200);
    res.json({
      status: "success",
      message: "email verified successfully",
      data: null,
    });
    return;
  } else if (isTokenValid.role === UserRole.Partner) {
    // check if the user exists
    const userExists = await Parceiro.findOne({ _id: userId });

    // if the user doesn't exist, send error msg
    if (!userExists) {
      const error = new HttpError("Invalid link", 400);
      return next(error);
    }

    // if everything is correct, we can then verify the user email and delete the token from the db
    await Parceiro.findByIdAndUpdate(userId, { isEmailVerified: true });
    await Token.deleteOne(isTokenValid);

    res.status(200);
    res.json({
      status: "success",
      message: "email verified successfully",
      data: null,
    });

    return;
  }

  res.json({ msg: 'something went wrong' });
});

// @desc - Verify email/resend token - if expired, or some error occurs
// route - GET /api/users/resend-verification
// @access - Public - everyone can access

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, userType } = req.body;

  if (userType === "visitor") {
    // check if the email exists
    const visitor = await Visitor.findOne({ email });

    // check to see if the email is valid and if the email is not yet verified
    if (visitor && !visitor.isEmailVerified) {
      // first, we need to check if there's still a token in the database that we can update
      const tokenExists = await Token.findOne({ userId: visitor._id });

      if (tokenExists) {
        // we can proceded with the update
        const tokenId = tokenExists._id;

        // new expiration date
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 2);

        const options = {
          token: crypto.randomBytes(32).toString("hex"),
          expiresAt: expiration,
        };

        const updatedToken = await Token.findByIdAndUpdate(tokenId, options);

        const userDataForEmail = {
          name: visitor.name,
          email: visitor.email,
          token: updatedToken.token,
        };

        // now we can send another email with the updated token
        await sendgridEmail(userDataForEmail);

        res.status(201);
        res.json({
          status: "success",
          message: "Verification email sent. ",
          data: null,
        });
      } else {
        // if the token was already deleted, we need to generate a new one
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 2);

        const { _id, name, email, userType } = visitor;
        // generate token
        const token = await Token.create({
          userId: _id,
          token: crypto.randomBytes(32).toString("hex"),
          userType,
          expiresAt: expiration,
        });
        const userDataForEmail = { name, email, token };

        // we need to send a verification email for the email provided
        await sendgridEmail(userDataForEmail);

        res.status(201);
        res.json({
          status: "success",
          message: "Verification email sent.",
          data: { _id, name, email, userType },
        });
      }
    }
  }
});

// @desc - get all the events
// route - GET /api/users/events
// @access - Public - everyone can access

/* const getAllEvents = asyncHandler(async (req, res) => {
  res.json({ msg: "Events list" });
}); */
const getAllEvents = asyncHandler(async (req, res) => {
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
});

// @desc - get all the itineraries
// route - GET /api/users/itineraries
// @access - Public - everyone can access

const getAllItineraries = asyncHandler(async (req, res) => {
  res.json({ msg: "Itineraries list" });
});

// @desc - get all services
// route - GET /api/users/services
// @access - Public - everyone can access

const getAllServices = asyncHandler(async (req, res) => {
  const services = ["artesanato", "hotelaria", "restauração"];

  const requestedService = req.query.service;

  if (services.includes(requestedService.toLowerCase())) {
    // get just the service requested
    const query = { tipoEntidade: requestedService };
    const service = await Parceiro(query);

    res.status(200);
    res.json({ status: "success", data: requestedService });
    return;
  }

  // if the service requested does not exist
  res.status(404);
  res.json({ status: "success", message: "service not found", data: null });
});

// @desc - get all the tourist attractions
// route - GET /api/users/attractions
// @access - Public - everyone can access

const getPontosTuristicosByTipo = async (req, res) => {
  const requestedPonto = req.query.ponto;

  try {
    const filteredPontosTuristicos = await PontoTuristico.find({
      tipo: requestedPonto,
    });

    if (filteredPontosTuristicos.length > 0) {
      res
        .status(200)
        .json({ status: "success", data: filteredPontosTuristicos });
      return;
    } else {
      res.status(200).json({
        status: "success",
        message: "Nenhum Ponto Turístico encontrado com o tipo especificado",
        data: null,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar os dados",
      data: null,
    });
  }
};

const getOnePontoTuristico = async (req, res) => {
  const requestedPonto = req.params.cardId; // Use params to get URL parameter

  try {
    const result = await PontoTuristico.findById(requestedPonto).select({
      __v: 0,
    });

    if (!result) {
      res.status(404).json({
        status: "error",
        message: "Ponto Turístico não encontrado",
        data: null,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar os dados",
      data: null,
    });
  }
};

//procura de promocoes conforme a consulta
const getAllPromotions = async (req, res) => {
  const { service } = req.query;
  let query = {};

  if (service) {
    query = { promotionSchema: service };
  }
  const promotions = await Promotion.find(query);

  if (promotions) {
    res.json(promotions);
  } else {
    const error = new HttpError("Failed to fetch promotions", 500);
    return next(error);
  }
};

const updatePassword = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { passwordToUpdate } = req.body;

  // encript password
  const hashedPwd = await encryptPassword(passwordToUpdate);

  const partners = Parceiro.findByIdAndUpdate(userId, { password: hashedPwd });
  const visitors = Visitor.findByIdAndUpdate(userId, { password: hashedPwd });
  const admins = Admin.findByIdAndUpdate(userId, { password: hashedPwd });

  // now we use promise all to get the results from those queries
  const results = await Promise.allSettled([partners, visitors, admins]);
  // results is going to give us an array will objects fullfilled or not,
  // and we need to know which one is not null so, if they have some result

  let user = null;

  for (const obj of results) {
    // see if the obj has a value that is not null

    if (obj.value) {
      // if there is some obj that has value then it found a user
      user = obj.value;
    }
  }


// get route to visitor information by ID
const getVisitorPerfil = async (req, res) => {
  const { id } = req.params; 

  try {
    const visitor = await Visitor.findById(id);
    if (!visitor) {
      return res.status(404).json({
        status: 'error',
        message: 'Visitor not found.',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Visitor found.',
      data: {
        name: visitor.name,
        email: visitor.email,
        dateOfBirth: visitor.dateOfBirth,
        city: visitor.city,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve visitor details.',
      error: error.message,
    });
  }
};


const resetPasswordVisitante = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { id } = req.params; 


  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'A nova senha e a confirmação de senha não correspondem.',
    });
  }
  console.log('newPassword:', newPassword);
  console.log('confirmPassword:', confirmPassword);
  try {
   
    const user = await Visitor.findById(id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Visitante não encontrado. A redefinição de senha falhou.',
      });
    }

    user.password = newPassword;
    await user.save();

   
    res.status(200).json({
      status: 'success',
      message: 'Senha redefinida com sucesso.',
    });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Ocorreu um erro ao redefinir a senha.',
    });
  }
};



  res.status(200);
  res.json({
    status: "success",
    message: "Palavra-passe atualizada com sucesso!",
  });
});

module.exports = {
  registerVisitor,
  registerPartner,
  login,
  resetPassword,
  updatePassword,
  confirmResetPassword,
  verifyEmailWithToken,
  resendEmailVerification,
  getAllEvents,
  getAllServices,
  getAllItineraries,
  getPontosTuristicosByTipo,
  getOnePontoTuristico,
  getAllPromotions,
  updatePartnerProfile,
  // updateVisitorPerfil,
  // getVisitorPerfil,
  // resetPasswordVisitante,
};
