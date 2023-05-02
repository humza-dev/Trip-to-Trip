const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("../handlers/cloudinary");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const passport = require("passport");
const User = require("../models/users");
const Guides = require("../models/users");
// const SecurityAgency = require("../models/users");

// User Signup
exports.UserSignup = async (req, res, next) => {
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

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
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

//Guide Sign Up
exports.GuideSignup = async (req, res) => {
  try {
    let {
      firstname,
      lastname,
      password,
      email,
      address,
      phonenumber,
      cnic,
      isAvalaible,
      role,
      location,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !password ||
      !email ||
      !address ||
      !phonenumber ||
      !cnic ||
      !isAvalaible ||
      !location ||
      !role
    ) {
      return res.status(400).send("all fields are required");
    }

    let userExist = await Guides.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).send("That user already exisits!");
    }
    //guide avatar and guidelicense upload
    let avatar = await cloudinary.uploader.upload(req.files.avatar[0].path);
    let guidelicense = await cloudinary.uploader.upload(
      req.files.guidelicense[0].path
    );
    fs.unlink(req.files.avatar[0].path, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
    });

    fs.unlink(req.files.guidelicense[0].path, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
    });
    //password hash

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // Create new guide
    let guide = new Guides({
      firstname: req.body.firstname,
      lastname: req.body.lastname,

      password: hash,
      email: req.body.email,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      cnic: req.body.cnic,
      isAvalaible: req.body.isAvalaible,
      location: req.body.location,
      avatar: avatar.url,
      guidelicense: guidelicense.url,
      role,
    });
    // Save guide
    await guide.save();
    // Create JWT payload
    const payload = { id: guide._id };
    const secret = process.env.Jwt_Secret;
    const expiresIn = process.env.JWT_EXPIRE;
    const token = jwt.sign(payload, secret, { expiresIn });

    res.status(201).json({ guide, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// //security agency signup
// exports.SecurityAgencySignup = async (req, res) => {
//   try {
//     let { agencyname, password, email, address, phonenumber } = req.body;
//     if (!agencyname || !password || !email || !phonenumber || !address) {
//       return res.status(400).send("all fields are required");
//     }

//     //Upload image to cloudinary
//     let result = await cloudinary.uploader.upload(req.file.path);
//     fs.unlink(req.file.path, (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });

//     //password hash

//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     // Create new user
//     let securityagency = new SecurityAgency({
//       agencyname: req.body.agencyname,
//       password: hash,
//       email: req.body.email,
//       address: req.body.address,
//       phonenumber: req.body.phonenumber,
//       companylicense: result.secure_url,
//       role: req.body.role,
//     });
//     // Save user
//     await securityagency.save();
//     // Create JWT payload
//     const payload = { id: securityagency._id };
//     const secret = process.env.Jwt_Secret;
//     const expiresIn = process.env.JWT_EXPIRE;
//     const token = jwt.sign(payload, secret, { expiresIn });

//     securityagency.password = undefined;
//     res.json({ securityagency, token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// //sign in
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = { id: user._id };
    const secret = process.env.Jwt_Secret;
    const expiresIn = process.env.JWT_EXPIRE;
    const token = jwt.sign(payload, secret, { expiresIn });

    user.password = undefined;

    res.status(200).json({ user, token: `Bearer ${token}` });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// //signout

// exports.signout = async (req, res, next) => {
//   try {
//     await req.logout();
//     res.status(200).send("logged out");
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// //Read all type of users
// exports.readall = async (req, res, next) => {
//   try {
//     const users = await User.find({});

//     if (!users) {
//       return res.status(400).json({ message: "No users found" });
//     }
//     res.status(200).json({ users });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.remove = async (req, res) => {
//   try {
//     const userExist = await User.findById(req.params.id);

//     if (!userExist) {
//       return res.status(404).send("guide not found");
//     }
//     await User.findOneAndDelete({
//       _id: req.params.id,
//     });

//     res.send("user removed successfully!");
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// };

// //!Passport middleware
// exports.userAuth = passport.authenticate("jwt", { session: false });

// //!ROLE BASED AUTH
// exports.checkRole = (roles) => (req, res, next) =>
//   !roles.includes(req.user.role)
//     ? res.status(401).json("You are not authorized for this route")
//     : next();
