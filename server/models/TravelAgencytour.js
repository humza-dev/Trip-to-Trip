const mongoose = require("mongoose");
const TravelAgencytourschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [40, "tour name should be upto 40 character"],
    minength: [10, "tour ame should be atleast 10 cahracter"],
  },
  duration: {
    type: Number,
    required: [true, "duration of tour must be there"],
  },
  travelAgency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "travel agency name must be there"],
  },
  summary: {
    type: String,
    required: [true, "summary of tour must be there"],
    maxlength: 20,
  },
  description: {
    type: String,
    required: [true, "description of tour must be needed"],
    maxlength: 200,
  },
  startDate: { type: Date, default: Date.now() },
  startlocation: {
    type: String,
  },
  imageCover: { type: String },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },

  price: { type: String, required: [true, "price must be included"] },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "rating must be atleast 1"],
    max: [5, "rating must be atleast 5"],
    //set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

const TravelAgencytour = mongoose.model(
  "TravelAgencytour",
  TravelAgencytourschema
);
module.exports = TravelAgencytour;
