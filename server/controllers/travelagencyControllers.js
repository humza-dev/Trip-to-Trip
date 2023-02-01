const TravelAgency = require("../models/users");

require("../handlers/cloudinary");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

exports.read = async (req, res) => {
  try {
    const travelagency = await TravelAgency.findOne({
      _id: req.params.userID,
    });

    if (!travelagency) {
      return res.status(404).send("travelagency doesn't exist");
    }

    res.send(travelagency);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.readall = async (req, res) => {
  try {
    let travelagency = req.query.travelagency ? req.query.travelagency : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const travelagencies = await TravelAgency.find({})
      .sort([[sortBy, travelagency]])
      .limit(limit);
    if (!travelagencies) {
      return res.status(404).send("travel agencies not found");
    }

    res.status(200).send(travelagencies);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.update = async (req, res) => {
  try {
    const { agencyname, email, password, address, phonenumber } = req.body;
    const travelagency = await TravelAgency.findById(req.params.id);

    if (!travelagency) {
      return res.status(404).json({ message: "User not found" });
    }

    const id = req.params.id;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      travelagency.companylicense = result.secure_url;
    }
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
    const UpdatedTravelAgency = await TravelAgency.findOneAndUpdate(id, {
      agencyname,
      email,
      password,
      address,
      phonenumber,
      companylicense: travelagency.companylicense,
    });

    await UpdatedTravelAgency.save();

    return res.status(200).json({ message: "agency updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
