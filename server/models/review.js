const mongoose = require("mongoose");
const ReviewModel = mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    rerquired: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", ReviewModel);
module.exports = Review;
