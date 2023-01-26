const travelagencyBooking = require("../models/TravelAgencyBooking");

exports.createBooking = async (req, res) => {
  try {
    let { tour, user, price, paid, startDate, endDate } = req.body;
    if (!tour && !user && !price && !paid && !startDate && !endDate) {
      return res.status(402).send("all fields are required");
    }

    const Booking = new travelagencyBooking({
      tour: req.body.tour,

      user: req.body.user,
      price: req.body.price,

      paid: req.body.paid,

      startDate: req.body.startDate,

      endDate: req.body.endDate,
    });

    await Booking.save();
    res.status(201).send(Booking);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
exports.getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const Booking = await travelagencyBooking.findById(id);
    if (!Booking) {
      return res.status(404).send("booking not found");
    }
    res.status(200).send(Booking);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await travelagencyBooking.find({});
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
    let { tour, user, price, paid, startDate, endDate } = req.body;

    const Booking = await travelagencyBooking.findById(req.params.id);
    if (!Booking) {
      return res.status(404).send("booking not found");
    }

    const updatedBooking = await travelagencyBooking.findByIdAndUpdate(
      req.params.id,
      { tour, user, price, paid, startDate, endDate },

      { new: true }
    );

    res.status(200).send(updatedBooking);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await travelagencyBooking.findById(id);
    if (!booking) {
      return res.status(404).send("booking not found");
    }

    await booking.remove();
    res.status(200).send("booking deleted");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
