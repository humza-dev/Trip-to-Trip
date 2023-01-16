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

exports.read = async (req, res) => {
  try {
    const guide = await Guides.findOne({
      _id: req.params.userID,
    });

    if (!guide) {
      return res.status(404).send("guide doesn't exist");
    }

    res.send(guide);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.readall = (req, res) => {
  Guides.find({}).then((guide) => {
    req.body.photo = undefined;
    req.body.guidelicense = undefined;
    res.status(201).send(guide);
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
exports.remove = async (req, res) => {
  try {
    const guide = await Guides.findOneAndDelete({
      _id: req.params.userID,
    });

    if (!guide) {
      res.status(404).send("guide not found");
    }

    res.send("guide removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};
