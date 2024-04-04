const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the email schema
const messagesSchema = new Schema({
  subject: String,
  sender: {
    name: String,
    email: String,
    picture: String,
  },
  flags: [Number],
  folder: String,
  body: String,
  attachments: [
    {
      filename: String,
      type: String,
      path: String,
    },
  ],
  in_reply_to: String,
  references: [String],
  user_id: {
    type: Schema.Types.ObjectId,
  },
});

// Create the Email model using the schema
const Messages = mongoose.model("Messages", messagesSchema, "messages");

module.exports = Messages;
