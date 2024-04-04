const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserRole } = require("../helpers/enums");
const { encryptPassword } = require("../utils/hashPassword");
const { Schema } = mongoose;

const GENDERS = ["m", "f", "other"];

const visitorSchema = new mongoose.Schema(
  {
    role: {
      type: Number,
      default: UserRole.Visitor,
    },
    name: {
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
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: String,
      enum: GENDERS, // this will only allow values that are inside the GENRES ARRAY
    //  required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      // required: true,
      unique: true,
    },
    passport: {
      pointsWon: [
        {
          // this schema types will make reference with the place schema id
          placeId: { type: Schema.Types.ObjectId, ref: "Place" },
          associatedPoints: Number,
          visitDateTime: {
            type: Date,
            // in case the date is omitted, the default will be the current
            // time that the new document was created
            default: Date.now,
          },
        },
      ],
      pointsSpent: [
        {
          promotionId: { type: Schema.Types.ObjectId, ref: "Promotion" },
          numberOfPoints: Number,
          visitDateTime: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      level: String,
      totalPoints: Number,
    },
    /**
     * * since we want to reference, two possible but different id's from different collections
     * * we need to ref a model and then on that model, define the possible options on an enum
     */
    favorites: [{ type: Schema.Types.ObjectId, ref: "refModel" }],
    refModel: {
      type: String,
      enum: ["Place", "Partner"],
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
visitorSchema.index({ email: 1 });

// middleware hook for before saving a new visitor into the db
// arrow functions can't be used here because of the 'this' keyword behavior on them
visitorSchema.pre("save", async function (next) {
  // we need to check if the password was changed in any way, so that we only hash it once and never again

  if (!this.isModified("password")) {
    next();
  }
  console.log(this.password);
  // if we are creating the password for the first time, we can hash it
  this.password = await encryptPassword(this.password);
  console.log(this.password);
});

// we can add methods to schemas
// so, we can add one method to compare the plain password the user sends us to the hashed password
visitorSchema.methods.matchPasswords = async function (plainPassword) {
  // this will return true if they match otherwise false

  try {
    console.log("Plain Password:", plainPassword);
    console.log("Stored Password:", this.password);
    const result = await bcrypt.compare(plainPassword, this.password);
    console.log("Comparison Result:", result);
    return result;
  } catch (error) {
    console.error("Error during password comparison:", error);
    return false; // Return false to indicate a failed comparison.
  }
};

const Visitor = new mongoose.model("Visitor", visitorSchema, "visitors");

module.exports = Visitor;
