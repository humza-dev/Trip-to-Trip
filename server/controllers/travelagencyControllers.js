const TravelAgency = require("../models/TravelAgency");

require("../handlers/cloudinary");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

exports.signup = async (req, res) => {
  try {
    let { agencyname, password, email, address, phonenumber } = req.body;
    if (!agencyname || !password || !email || !phonenumber || !address) {
      return res.status(400).send("all fields are required");
    }

    //Upload image to cloudinary
    let result = await cloudinary.uploader.upload(req.file.path);
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    // Create new user
    let travelagency = new TravelAgency({
      agencyname: req.body.agencyname,
      password: req.body.password,
      email: req.body.email,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      companylicense: result.secure_url,
    });
    // Save user
    await travelagency.save();
    travelagency.password = undefined;
    res.json(travelagency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send("email and password are required");
    }
    const travelagency = await TravelAgency.find((e) => e.email === email);
    if (!travelagency) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).send(travelagency);
  } catch (e) {
    res.status(500).send();
  }
};
exports.signout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.redirect("logout succuess");
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

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
    const travelagency = await TravelAgency.findById(req.params.userID);

    if (!travelagency) {
      return res.status(404).json({ message: "User not found" });
    }

    const id = req.params.userID;

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
exports.remove = async (req, res) => {
  try {
    const travelagency = await TravelAgency.findOneAndDelete({
      _id: req.params.userID,
    });

    if (!travelagency) {
      return res.status(404).send("travelagency not found");
    }

    res.send("travelagency removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};
