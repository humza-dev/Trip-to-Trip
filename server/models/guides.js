const mongoose = require("mongoose");

const GuideScheama = new mongoose.Schema(
  {
    name: {
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
    cnic: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 13,
      minlength: 13,
    },
    guidelicense: { data: Buffer, contentType: String },
    photo: { data: Buffer, contentType: String },
    isAvalaible: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guide", GuideScheama);
