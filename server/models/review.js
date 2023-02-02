const mongoose = require("mongoose");
const ReviewModel = mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: [Number, "it should be number"],
    min: 1,
    max: 5,
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    rerquired: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", ReviewModel);
module.exports = Review;
