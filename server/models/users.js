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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchmea);
