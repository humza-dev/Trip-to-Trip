const TravelAgency = require("../models/TravelAgency");
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
    let travelagency = new TravelAgency(fields);
    if (files.companylicense) {
      if (files.companylicense.size > 1000000) {
        return res.status(400).json({ error: "file should be les than 1mb" });
      }
      const { agencyname, email, password, address, phonenumber } = fields;
      if (!agencyname || !email || !password || !address || !phonenumber) {
        return res.status(400).json({
          error: "all fields are required!",
        });
      }

      travelagency.companylicense.data = fs.readFileSync(
        files.companylicense.filepath
      );
      travelagency.companylicense.contentType = files.companylicense.mimetype;
    }
    travelagency.save((err, result) => {
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
  TravelAgency.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with following email doen't exist. Please signup",
      });
    }

    return res.send("login succesfully!");
  });
};
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "signed out successfully" });
};

exports.read = (req, res) => {
  TravelAgency.findById({ _id: req.params.userID }).exec((err, agency) => {
    if (err || !agency) {
      res.status(400).send("travel agency not found");
    }

    agency.password = undefined;
    res.status(201).send(agency);
  });
};

exports.update = (req, res) => {
  TravelAgency.findOneAndUpdate(
    { _id: req.params.userID },
    { $set: req.body },
    { new: true },
    (err, agency) => {
      if (err) {
        res.status(400).send(err);
      }
      agency.password = undefined;
      agency.save();
      res.status(200).send(agency);
    }
  );
};
exports.remove = (req, res) => {
  TravelAgency.findByIdAndDelete({ _id: req.params.userID }, (err, agency) => {
    if (err || !agency) {
      res.status(400).send("Travel agency not found!");
    }

    res.send("Travel agency removed successfully");
  });
};
