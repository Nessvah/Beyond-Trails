const mongoose = require("mongoose");

const pontosSchema = new mongoose.Schema({
  local: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  morada: {
    type: String,
    required: true,
  },
  coordenadas: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
  },
  telemovel: {
    type: String,
  },
  website: {
    type: String,
  },
  acessibilidade: {
    type: String,
  },
  qrcode: {
    type: String,
  },
  tipo: {
    type: Number,
    required: true,
  },
  pontosAssociados: {
    type: Number,
    required: true,
  },
});

const PontoTuristico = mongoose.model(
  "PontoTuristico",
  pontosSchema,
  "Pontos Turísticos"
);

module.exports = { PontoTuristico };
