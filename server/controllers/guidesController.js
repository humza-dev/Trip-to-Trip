const Guides = require("../models/guides");
const formidable = require("formidable");
const fs = require("fs");

exports.signup = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        err: "File could not be uploaded",
      });
    }

    let guides = new Guides(fields);
    if (files.guidelicense && files.photo) {
      if (files.guidelicense.size > 1000000) {
        return res.status(400).json({ error: "file should be les than 1mb" });
      }
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: "file should be les than 1mb" });
      }
      const { name, email, password, address, cnic, phonenumber } = fields;
      if (!name || !email || !password || !address || !phonenumber || !cnic) {
        return res.status(400).json({
          error: "all fields are required!",
        });
      }

      guides.guidelicense.data = fs.readFileSync(files.guidelicense.filepath);
      guides.guidelicense.contentType = files.guidelicense.mimetype;
      guides.photo.data = fs.readFileSync(files.photo.filepath);
      guides.photo.contentType = files.photo.mimetype;
    }
    guides.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  Guides.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with following email doen't exist. Please signup",
      });
    }

    // const { _id, username, email } = travelagency;
    return res.send("login succesfully!");
  });
};
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "signed out successfully" });
};
exports.read = (req, res) => {
  const id = req.params.userID;
  Guides.findById({ _id: id }).exec((err, guide) => {
    if (err || !guide) {
      res.status(404).send("Guide not found");
    }
    guide.password = undefined;
    res.send(guide);
  });
};
exports.update = (req, res) => {
  Guides.findOneAndUpdate(
    { _id: req.params.userID },
    { $set: req.body },
    { new: true },
    (err, guide) => {
      if (err || !guide) {
        res.status(404).send("guide not found");
      }

      res.send(guide);
    }
  );
};
exports.remove = (req, res) => {
  Guides.findByIdAndDelete({ _id: req.params.userID }, (err, guide) => {
    if (err || !guide) {
      res.status(404).send("Guide not found");
    }
    res.send("Guide removed successfully");
  });
};
