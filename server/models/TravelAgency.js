const mongoose = require("mongoose");
const validator = require("validator");

const TravelAgencyScheama = new mongoose.Schema(
  {
    agencyname: {
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
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
    },

    address: { type: String, trim: true, required: true },
    phonenumber: { type: Number, trim: true, required: true },
    companylicense: { type: String },
  },
  { timestamps: true }
);
//TODO PASSWORD HASH AND COMPARE

module.exports = mongoose.model("TravelAgency", TravelAgencyScheama);
