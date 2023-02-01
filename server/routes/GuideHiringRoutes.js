const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  createBooking,
  getAllBookings,
  getBooking,
  userTours,

  updateBooking,
  deleteBooking,
} = require("../controllers/GuideHiringController");

//create booking route
router.post("/create", createBooking);
router.get("/:id", getBooking);
router.get("/", getAllBookings);
router.put("/update/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/me/:id", userTours);

module.exports = router;
