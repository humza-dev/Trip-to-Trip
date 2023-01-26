const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_nAME,
  api_key: process.env.API_kEY,

  api_secret: process.env.API_sECRET,
});

module.exports = cloudinary;
