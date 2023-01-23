const User = require("../models/users");
const fs = require("fs");
const cloudinary = require("cloudinary");
const path = require("path");

require("../handlers/cloudinary");

exports.signup = async (req, res) => {
  try {
    let { fullname, password, email } = req.body;
    if (!fullname || !password || !email) {
      return res.status(400).send("all fields are required");
    }

    // let userExist = User.findOne({ email: req.body.email });
    // if (userExist) {
    //   return res.status(400).send("That user already exisits!");
    // }
    //Upload image to cloudinary
    let result = await cloudinary.uploader.upload(req.file.path);

    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
    // Create new user
    let user = new User({
      fullname: req.body.fullname,
      password: req.body.password,
      email: req.body.email,
      avatar: result.secure_url,
    });
    // Save user
    await user.save();
    user.password = undefined;
    res.json(user);
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
    const user = await User.find((e) => e.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).send(user);
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

exports.update = async (req, res) => {
  try {
    let user = await User.findById(req.params.userID);
    // Upload image to cloudinary
    let result = await cloudinary.uploader.upload(req.file.path);
    let data = {
      fullname: req.body.fullname || user.fullname,
      password: req.body.password,
      email: req.body.email,
      avatar: result.secure_url || user.avatar,
    };
    user = await User.findByIdAndUpdate(req.params.userID, data, {
      new: true,
    });
    res.json(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.remove = async (req, res) => {
  try {
    let user = await User.findOneAndDelete({
      _id: req.params.userID,
    });

    if (!user) {
      res.status(404).send("user not found");
    }

    res.send("user removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};

exports.read = async (req, res) => {
  const id = req.params.userID;

  try {
    const user = await User.findById({ _id: id });
    await cloudinary.uploader.destroy(user.cloudinary_id);

    if (!user) {
      res.status(404).send("tour not found");
    }

    user.password = undefined;
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.readall = async (req, res) => {
  try {
    let user = req.query.user ? req.query.user : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    const users = await User.find({})
      .sort([[sortBy, user]])
      .limit(limit);
    if (!users) {
      res.status(404).send("users not found");
    }
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};
