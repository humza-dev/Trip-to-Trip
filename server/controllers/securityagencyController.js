const SecurityAgency = require("../models/SecurityAgency");

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
    let securityagency = new SecurityAgency({
      agencyname: req.body.agencyname,
      password: req.body.password,
      email: req.body.email,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      companylicense: result.secure_url,
    });
    // Save user
    await securityagency.save();
    securityagency.password = undefined;
    res.json(securityagency);
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
    const securityagency = await SecurityAgency.find((e) => e.email === email);
    if (!securityagency) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).send(securityagency);
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
    const securityagency = await SecurityAgency.findById(req.params.userID);

    if (!securityagency) {
      return res.status(404).json({ message: "User not found" });
    }

    const id = req.params.userID;

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

exports.remove = async (req, res) => {
  try {
    const securityagency = await SecurityAgency.findOneAndDelete({
      _id: req.params.userID,
    });

    if (!securityagency) {
      return res.status(404).send("securityagency not found");
    }

    res.send("securityagency removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};
