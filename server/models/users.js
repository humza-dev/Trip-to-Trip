const mongoose = require("mongoose");
const validator = require("validator");

const userSchmea = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      maxlength: 50,
      lowercase: true,
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: 50,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "can't be blank"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
      unique: true,
    },
    password: {
      type: String,

      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    tokens: {
      token: String,
    },
  },
  { timestamps: true }
);

//TODO PASSWORD HASH AND COMPARE

module.exports = mongoose.model("Users", userSchmea);
