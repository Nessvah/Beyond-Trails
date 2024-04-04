const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * * This will create a token schema for our generated tokens
 * * for email verification
 */

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "refModel",
    required: true,
  },
  refModel: {
    type: String,
    enum: ["Visitor", "Partner"],
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = { Token };
