const User = require("../models/users");
const GuideHiring = require("../models/GuideHiring");
const TravelAgencyBooking = require("../models/TravelAgencyBooking");
const SecurityAgencyHiring = require("../models/SecurityHiring");

require("../handlers/cloudinary");

exports.update = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email;
    user.password = password;

    await user.save();

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating user", error: err });
  }
};

exports.remove = async (req, res) => {
  try {
    let userExist = await User.findById(req.params.id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(req.params.id);

    res.send("user removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;

  try {
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).send("user not found");
    }
    const user = await User.findById(id);

    user.password = undefined;
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getMyGuideTours = async (req, res) => {
  try {
    const Hirings = await GuideHiring.find({ user: req.body._id });

    const hiringIDs = Hirings.map((Hiring) => Hiring._id);
    const hirings = await GuideHiring.find({ _id: { $in: hiringIDs } });
    res.status(200).json(hirings);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getMyTours = async (req, res) => {
  try {
    const Bookings = await TravelAgencyBooking.find({ user: req.body._id });
    const bookingIDs = Bookings.map((Booking) => Booking._id);

    const bookings = await TravelAgencyBooking.find({
      _id: { $in: bookingIDs },
    });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getMySecurityHirings = async (req, res) => {
  try {
    const Hirings = await SecurityAgencyHiring.find({ user: req.body._id });
    const hiringsIDs = Hirings.map((Hiring) => Hiring._id);
    const hirings = await SecurityAgencyHiring.find({
      _id: { $in: hiringsIDs },
    });

    res.status(200).json(hirings);
  } catch (err) {
    res.status(500).send(err);
  }
};
