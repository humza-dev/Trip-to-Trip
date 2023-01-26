const mongoose = require("mongoose");

const TravelAgencyBookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TravelAgencytour",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
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

module.exports = mongoose.model(
  "TravelAgencyBooking",
  TravelAgencyBookingSchema
);
