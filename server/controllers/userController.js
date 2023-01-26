const User = require("../models/users");
const fs = require("fs");
const cloudinary = require("cloudinary");
const path = require("path");

require("../handlers/cloudinary");

exports.signup = async (req, res) => {
  try {
    let { firstname, lastname, password, email } = req.body;
    if (!firstname || lastname || !password || !email) {
      return res.status(400).send("all fields are required");
    }

    // let userExist = User.findOne({ email: req.body.email });
    // if (userExist) {
    //   return res.status(400).send("That user already exisits!");
    // }

    // Create new user
    let user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email,
    });
    //hash password
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
  const id = req.params.userID;

  try {
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).send("tour not found");
    }
    const user = await User.findById(id);

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
      return res.status(404).send("users not found");
    }
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};
