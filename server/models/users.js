const mongoose = require("mongoose");

const userSchmea = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      maxlength: 50,
      required: [true, "can't be blank"],

      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "can't be blank"],

      index: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords must match",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchmea);
