const TravelAgencytour = require("../models/TravelAgencytour");
const fs = require("fs");
const formidable = require("formidable");

exports.createTour = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status.send(err);
    }

    let tours = TravelAgencytour(fields);

    if (files.imageCover && files.image1 && files.image2 && files.image3) {
      if (files.imageCover.size > 1000000) {
        return res
          .status(400)
          .json({ error: "image cover should be upto 1 mb" });
      }
      if (files.image1.size > 1000000) {
        return res.status(400).json({ error: "image should be upto 1 mb" });
      }
      if (files.image2.size > 1000000) {
        return res.status(400).json({ error: "image should be uptio 1 mb" });
      }
      if (files.image3.size > 1000000) {
        return res.status(400).json({ error: "image should be upto 1 mb" });
      }

      //   const { name, duration, summary, description, startDate, startlocation } =
      //     fields;

      //   if (
      //     !name ||
      //     !duration ||
      //     !summary ||
      //     !description ||
      //     !startDate ||
      //     !startlocation
      //   ) {
      //     return res.status(400).json({ error: "all fields are required" });
      //   }

      tours.imageCover.data = fs.readFileSync(files.imageCover.filepath);
      tours.imageCover.contentType = files.imageCover.mimetype;
      tours.image1.data = fs.readFileSync(files.image1.filepath);
      tours.image1.contentType = files.image1.mimetype;
      tours.image2.data = fs.readFileSync(files.image2.filepath);
      tours.image2.contentType = files.image2.mimetype;
      tours.image3.data = fs.readFileSync(files.image3.filepath);
      tours.image3.contentType = files.image3.mimetype;
    }

    tours.save((err, data) => {
      if (err) {
        res.status(400).send(err);
      }
      res.send(data);
    });
  });
};

exports.allTours = (req, res) => {
  TravelAgencytour.find({}, (err, tours) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).send(tours);
  });
};

exports.tourByid = async (req, res) => {
  try {
    const tour = await TravelAgencytour.findById({ _id: req.params.id });

    if (!tour) {
      res.status(404).send("tour not found");
    }
    res.send(tour);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.remove = async (req, res) => {
  try {
    const travelagencytour = await TravelAgencytour.findOneAndDelete({
      _id: req.params.id,
    });

    if (!travelagencytour) {
      res.status(404).send("travelagencytour not found");
    }

    res.send("travelagencytour removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};
