const Guides = require("../models/guides");
const fs = require("fs");
const path = require("path");

require("../handlers/cloudinary");
const cloudinary = require("cloudinary").v2;

//guide signup
exports.signup = async (req, res) => {
  try {
    let { fullname, password, email, address, phonenumber, cnic, isAvalaible } =
      req.body;
    if (
      !fullname ||
      !password ||
      !email ||
      !address ||
      !phonenumber ||
      !cnic ||
      !isAvalaible
    ) {
      return res.status(400).send("all fields are required");
    }

    // let userExist = await Guides.findOne({ email: req.body.email });
    // if (userExist) {
    //   return res.status(400).send("That user already exisits!");
    // }
    //guide avatar and guidelicense upload
    let avatar = await cloudinary.uploader.upload(req.files.avatar[0].path);
    let guidelicense = await cloudinary.uploader.upload(
      req.files.guidelicense[0].path
    );
    fs.unlink(req.files.avatar[0].path, (err) => {
      if (err) {
        console.log(err);
      }
    });

    fs.unlink(req.files.guidelicense[0].path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    // Create new guide
    let guide = new Guides({
      fullname: req.body.fullname,
      password: req.body.password,
      email: req.body.email,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      cnic: req.body.cnic,
      isAvalaible: req.body.isAvalaible,
      avatar: avatar.url,
      guidelicense: guidelicense.url,
    });
    // Save guide
    await guide.save();

    res.status(201).json(guide);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send("email and password are required");
    }
    const guide = await Guides.find((e) => e.email === email);
    if (!guide) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).send(guide);
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
    } = req.body;

    const guide = await Guides.findById(req.params.userID);
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

    let Updatedguide = await Guides.findByIdAndUpdate(req.params.userID, {
      fullname,
      password,
      email,
      address,
      phonenumber,
      cnic,
      isAvalaible,
      avatar: avatarUrl,
      guidelicense: guidelicenseUrl,
    });

    await Updatedguide.save();
    res.status(200).send("user updated successfully");
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const guideExist = await Guides.findById(req.params.userID);

    if (!guideExist) {
      return res.status(404).send("guide not found");
    }

    const guide = await Guides.findOneAndDelete({
      _id: req.params.userID,
    });

    res.send("guide removed successfully!");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
