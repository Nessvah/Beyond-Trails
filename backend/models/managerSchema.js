const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { encryptPassword } = require("../utils/hashPassword");
const { Schema } = mongoose;

const STATUS = [
  "Convite enviado. A Aguardar resposta.",
  "Convite aceite",
  "Convite rejeitado",
  "Aguardar aprovação",
];

const managerSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      default: "tourismManager",
    },
    accountStatus: {
      type: String,
      required: true,
      enum: STATUS,
      default: "Convite enviado. A Aguardar resposta.",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 8,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    nif: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    tourismDistrict: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: "static/media/avatar-placeholder.457c68dfbe184f0a1370.png",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt", // To store the created date
      updatedAt: "updatedAt", // To store the last updated date
    },
  }
);

/**
 * * When creating a document, a __v will appear in the database document
 * * The __v field is called the version key. It describes the internal revision of a document.
 * * This __v field is used to track the revisions of a document.
 */

// create index on email field since we are going to use it a lot when creating users
// an account
managerSchema.index({ email: 1 });

// middleware hook for before saving a new visitor into the db
// arrow functions can't be used here because of the 'this' keyword behavior on them
managerSchema.pre("save", async function (next) {
  // we need to check if the password was changed in any way, so that we only hash it once and never again

  if (!this.isModified("password")) {
    next();
  }

  // if we are creating the password for the first time, we can hash it
  this.password = await encryptPassword(this.password);
});

// we can add methods to schemas
// so, we can add one method to compare the plain password the user sends us to the hashed password
managerSchema.methods.matchPasswords = async function (plainPassword) {
  // this will return true if they match otherwise false
  return await bcrypt.compare(plainPassword, this.password);
};

const TourismManager = new mongoose.model(
  "TourismManager",
  managerSchema,
  "tourismManagers"
);

module.exports = { TourismManager };
