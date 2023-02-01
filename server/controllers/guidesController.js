const Guides = require("../models/users");
const fs = require("fs");
const path = require("path");

require("../handlers/cloudinary");
const cloudinary = require("cloudinary").v2;

//guide signup

exports.read = async (req, res) => {
  try {
    const guide = await Guides.findOne({
      _id: req.params.userID,
    });

    if (!guide) {
      return res.status(404).send("guide doesn't exist");
    }

    res.send(guide);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.readall = async (req, res) => {
  try {
    let guides = req.query.guide ? req.query.guide : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const guide = await Guides.find({})
      .sort([[sortBy, guides]])
      .limit(limit);

    if (!guide) {
      return res.status(404).send("guides not found");
    }
    res.status(200).send(guide);
  } catch (e) {
    res.status(500).send();
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      fullname,
      password,
      email,
      address,
      phonenumber,
      cnic,
      isAvalaible,
      role,
    } = req.body;

    const guide = await Guides.findById(req.params.id);
    if (!guide) {
      return res.status(404).send("guide doesn't exist");
    }

    let avatarUrl = null;
    let guidelicenseUrl = null;

    if (req.files.avatar) {
      const avatar = await cloudinary.uploader.upload(req.files.avatar[0].path);
      avatarUrl = avatar.url;
      fs.unlink(req.files.avatar[0].path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (req.files.guidelicense) {
      const avatar = await cloudinary.uploader(req.files.guidelicense[0].path);
      guidelicenseUrl = avatar.url;
      fs.unlink(req.files.guidelicense[0].path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    let Updatedguide = await Guides.findByIdAndUpdate(req.params.id, {
      fullname,
      password,
      email,
      address,
      phonenumber,
      cnic,
      isAvalaible,
      avatar: avatarUrl,
      guidelicense: guidelicenseUrl,
      role,
    });

    await Updatedguide.save();
    res.status(200).send("user updated successfully");
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};
