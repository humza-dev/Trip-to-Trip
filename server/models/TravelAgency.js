const mongoose = require("mongoose");

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
      index: true,
    },
    password: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    phonenumber: { type: Number, trim: true, required: true },
    companylicense: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TravelAgency", TravelAgencyScheama);
