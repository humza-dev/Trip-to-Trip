const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "tour is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "User is required"],
    },
    guide: {
      type: mongoose.Schema.ObjectId,
      ref: "Guides",
      required: true,
    },
    price: { type: Number, required: [true, "booking must have price"] },
    paid: {
      type: Boolean,
      required: [true],
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
modules.exports = Booking;
