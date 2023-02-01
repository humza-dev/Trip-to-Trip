const mongoose = require("mongoose");
const SecurityHiringScehma = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  securityAgency: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("SecurityHiringScehma", SecurityHiringScehma);
