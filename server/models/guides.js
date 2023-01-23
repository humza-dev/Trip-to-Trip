const mongoose = require("mongoose");
const validator = require("validator");

const GuideScheama = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      maxlength: 50,
      required: [true, "can't be blank"],
      index: true,
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
      trim: true,

      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
    },

    address: { type: String, trim: true, required: true },
    phonenumber: { type: Number, trim: true, required: true },
    cnic: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 13,
      minlength: 13,
    },
    guidelicense: { type: String },
    avatar: {
      type: String,
    },

    isAvalaible: { type: Boolean },
  },
  { timestamps: true }
);

//TODO PASSWORD HASH AND COMPARE

module.exports = mongoose.model("Guide", GuideScheama);
