const SecurityAgency = require("../models/users");

require("../handlers/cloudinary");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

exports.read = async (req, res) => {
  try {
    const securityagency = await SecurityAgency.findById({
      _id: req.params.userID,
    });

    if (!securityagency) {
      return res.status(404).send("securityagency doesn't exist");
    }

    res.send(securityagency);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.readall = async (req, res) => {
  try {
    let securityagency = req.query.securityagency
      ? req.query.securityagency
      : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    const securityagecies = await SecurityAgency.find({})
      .sort([[sortBy, securityagency]])
      .limit(limit);

    if (!securityagecies) {
      return res.status(404).send("security agencies not found");
    }
    res.status(200).send(securityagecies);
  } catch (e) {
    res.status(500).send();
  }
};

exports.update = async (req, res) => {
  try {
    const { agencyname, email, password, address, phonenumber } = req.body;
    const securityagency = await SecurityAgency.findById(req.params.id);

    if (!securityagency) {
      return res.status(404).json({ message: "User not found" });
    }

    const id = req.params.id;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      securityagency.companylicense = result.secure_url;
    }
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
    const UpdatedSecurityAgency = await SecurityAgency.findOneAndUpdate(id, {
      agencyname,
      email,
      password,
      address,
      phonenumber,
      companylicense: securityagency.companylicense,
    });

    await UpdatedSecurityAgency.save();

    return res.status(200).json({ message: "agency updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
