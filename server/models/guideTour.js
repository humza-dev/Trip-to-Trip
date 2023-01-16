const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "tour name must be unique"],
      trim: true,
      maxlength: [40, "A tour name must have less than 40 characters"],
      minlength: [10, "A tour name must be at least 10 characters"],
    },
    duration: { type: Number, required: true },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "rating must be greater than 1"],
      max: [5, "rating must be less than 6"],
      set: (val) => Math.round(val * 10) / 10,
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
    imageCover: { data: Buffer, contentType: String },
    image1: { data: Buffer, contentType: String },
    image2: { data: Buffer, contentType: String },
    image3: { data: Buffer, contentType: String },
    images: [String],
    startDates: {
      type: Date,
      default: Date.now(),
    },
    startLocation: { type: String },
    guides: { type: mongoose.Schema.ObjectId, ref: "Guides", required: true },
    locations: [
      {
        type: String,
        address: String,
        description: String,
        day: Number,
      },
    ],
  },
  { timestamps: true }
);

const Tour = mongoose.model("GuidesTour", tourSchema);
module.exports = Tour;
