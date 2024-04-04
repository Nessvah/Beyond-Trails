const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { encryptPassword } = require("../utils/hashPassword");
const { UserRole } = require("../helpers/enums");
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    role: {
      type: Number,
      default: UserRole.Admin,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt", // To store the created date
      updatedAt: "updatedAt", // To store the last updated date
    },
  }
);

// create index on email field since we are going to use it a lot when creating users
// an account
adminSchema.index({ email: 1 });

const Admin = mongoose.model("Admin", adminSchema, "admins");

module.exports = Admin;
