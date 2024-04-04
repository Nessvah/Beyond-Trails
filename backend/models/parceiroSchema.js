const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { partnerRole } = require("../helpers/enums");
const { Schema } = mongoose;
const { UserRole } = require("../helpers/enums");
const enderecoSchema = new Schema({
  morada: {
    type: String,
    required: true,
  },
  codigoPostal: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
});

const contactoSchema = new Schema({
  telefone: {
    type: String,
    required: true,
  },
  telemovel: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
});

const parceiroSchema = new Schema(
  {
    role: {
      type: Number,
      default: UserRole.Partner,
    },
    name: {
      type: String,
      required: true,
    },
    nif: {
      type: String,
      required: true,
    },
    tipoEntidade: {
      type: String,
      required: true,
    },
    endereco: enderecoSchema,
    contacto: contactoSchema,
    horario: {
      type: String,
    },
    descricao: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    urlImagem: {
      type: String,
      required: false,
    },
    urlTitularidade: {
      type: String,
    },
    urlRepresentante: {
      type: String,
    },
    isApproved: {
      type: Number,
      default: partnerRole.Pendente,
    },
  },
  {
    timestamps: true,
  }
);

parceiroSchema.index({ email: 1 });

const encryptPassword = async function (password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

parceiroSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await encryptPassword(this.password);
  next();
});

parceiroSchema.methods.matchPasswords = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const Parceiro = mongoose.model("Partner", parceiroSchema, "partners");
module.exports = { Parceiro };
