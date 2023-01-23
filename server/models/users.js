const mongoose = require("mongoose");
const validator = require("validator");

const userSchmea = new mongoose.Schema(
  {
    fullname: {
      type: String,
      // trim: true,
      // maxlength: 50,
      //lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "can't be blank"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
    },
    avatar: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

//TODO PASSWORD HASH AND COMPARE

module.exports = mongoose.model("Users", userSchmea);
