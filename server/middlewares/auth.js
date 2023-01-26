const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../middlewares/passport");

const User = require("../models/users");

exports.signup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate input
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });

    await user.save();

    // Create JWT payload
    const payload = { id: user._id };
    const secret = process.env.Jwt_Secret;
    const expiresIn = process.env.JWT_EXPIRE;
    const token = jwt.sign(payload, secret, { expiresIn });
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//sign in
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({ message: "User does not exist" });
    }

    bcrypt.compare(password, userExist.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (isMatch) {
        const payload = { id: userExist._id };
        const token = jwt.sign(payload, process.env.Jwt_Secret, {
          expiresIn,
        });
        return res.status(200).json({ user: userExist, token });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//signout

exports.signout = (req, res, next) => {
  try {
    req.logout();
    return res.status(200).send("logged out");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
