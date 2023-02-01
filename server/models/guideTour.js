const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "tour name must be unique"],
      trim: true,
    },
    duration: { type: Number, required: true },
    ratingsAverage: {
      type: Number,
      default: 1,
      min: [1, "rating must be greater than 1"],
      max: [5, "rating must be less than 6"],

      //set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: true },
    summary: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    imageCover: { type: String },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },

    startDates: {
      type: Date,
      default: Date.now(),
    },
    startLocation: { type: String },
    guide: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);

const Tour = mongoose.model("GuidesTour", tourSchema);
module.exports = Tour;
