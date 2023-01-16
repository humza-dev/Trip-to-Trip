const mongoose = require("mongoose");

const SecurityAgencyScheama = new mongoose.Schema(
  {
    agencyname: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      index: true,
    },
    password: { type: String, trim: true, required: true },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords must match",
      },
    },
    address: { type: String, trim: true, required: true },
    phonenumber: { type: Number, trim: true, required: true },
    companylicense: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SecurityAgency", SecurityAgencyScheama);
