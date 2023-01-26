const GuideHiring = require("../models/GuideHiring");
const User = require("../models/users");

exports.createBooking = async (req, res) => {
  try {
    let { tour, user, price, paid, startDate, endDate, guide } = req.body;
    if (!tour && !user && !price & !paid && !startDate && !endDate) {
      return res.status(402).send("all fields are required");
    }

    const Booking = new GuideHiring({
      tour,
      user,
      price,
      paid,
      startDate,
      endDate,
      guide,
    });

    await Booking.save();
    res.status(201).send(Booking);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

//get single booking

exports.getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const Booking = await GuideHiring.findById(id);
    if (!Booking) {
      return res.status(404).send("booking not found");
    }
    res.status(200).send(Booking);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//GET ALL BOOKINGS

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await GuideHiring.find({});
    if (!bookings) {
      return res.status(404).send("no bookings found");
    }

    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { user, tour, startDate, endDate, price, paid } = req.body;

    const Hiring = await GuideHiring.findById(req.params.id);
    if (!Hiring) {
      return res.status(404).json({ message: "Hiring not found" });
    }

    let updatedHiring = await GuideHiring.findByIdAndUpdate(
      req.params.id,
      { user, startDate, endDate, tour, price, paid },
      { new: true }
    );

    res.status(200).send(updatedHiring);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await GuideHiring.findById(id);
    if (!booking) {
      return res.status(404).send("booking not found");
    }

    await booking.remove();
    res.status(200).send("booking deleted");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// user tours

exports.userTours = async (req, res) => {
  const userId = req.params.userID;

  const tours = await GuideHiring.find({ user: userId });
  res.status(200).send(tours);
};
//63c9068de992d754bb2ab0b4
