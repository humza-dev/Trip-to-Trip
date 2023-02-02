const mongoose = require("mongoose");
const GuideHiringSchema = mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GuidesTour",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("GuideHiring", GuideHiringSchema);
