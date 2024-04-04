const { Schema, default: mongoose } = require("mongoose");

const eventoSchema = new Schema({
  nome: String,
  image: String,
  shortDescription: String,
  local: String,
  hora: String,
  bilhete: {type:{}},
  cartazUrl: String
});

// To use our schema definition, we need to convert our managerSchema into a Model we can work with.
const Event = mongoose.model("Evento", eventoSchema, "evento");

module.exports = {Event};