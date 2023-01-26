const securityHiring = require("../models/SecurityHiring");

// Create and Save a new SecurityHiring

exports.createHiring = async (req, res) => {
  try {
    const { user, securityAgency, startDate, endDate, location, price, paid } =
      req.body;

    const newHiring = new securityHiring({
      user,
      securityAgency,
      startDate,
      endDate,
      location,
      price,

      paid,
    });

    await newHiring.save();
    res.status(200).send(newHiring);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all hirings

exports.getAllHirings = async (req, res) => {
  try {
    let allHirings = await securityHiring.find({});
    if (!allHirings) {
      return res.status(404).json({ message: "No hirings found" });
    }
    res.status(200).send(allHirings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATED HIRING

exports.updateHiring = async (req, res) => {
  try {
    const { user, securityAgency, startDate, endDate, location, price, paid } =
      req.body;

    const Hiring = await securityHiring.findById(req.params.id);
    if (!Hiring) {
      return res.status(404).json({ message: "Hiring not found" });
    }

    let updatedHiring = await securityHiring.findByIdAndUpdate(
      req.params.id,
      { user, securityAgency, startDate, endDate, location, price, paid },
      { new: true }
    );

    res.status(200).send(updatedHiring);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete hiring

exports.deleteHiring = async (req, res) => {
  try {
    const hiring = await securityHiring.findByIdAndDelete(req.params.id);

    if (!hiring) {
      return res.status(404).json({ message: "Hiring not found" });
    }
    res.status(200).send("Hiring deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get hiring by id

exports.getHiringById = async (req, res) => {
  try {
    const hiring = await securityHiring.findById(req.params.id);
    if (!hiring) {
      return res.status(404).json({ message: "Hiring not found" });
    }

    res.status(200).send(hiring);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
