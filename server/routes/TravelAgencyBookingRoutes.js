const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/TravelAgencyBookingController");

//create booking route
router.post("/create", createBooking);
router.get("/:id", getBooking);
router.get("/", getAllBookings);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
