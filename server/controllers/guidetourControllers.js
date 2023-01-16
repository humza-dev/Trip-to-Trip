const Tour = require("../models/guideTour");
const fs = require("fs");
const formidable = require("formidable");

exports.createTour = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).send("error");
    }

    let tours = new Tour(fields);
    if (
      files.imageCover &&
      files.image1 &&
      files.image2 &&
      files.image1 &&
      files.image3
    ) {
      if (files.imageCover.size > 1000000) {
        return res
          .status(400)
          .json({ error: "imageCover should be les than 1mb" });
      }
      if (files.image1.size > 1000000) {
        return res.status(400).json({ error: "image should be les than 1mb" });
      }
      if (files.image2.size > 1000000) {
        return res.status(400).json({ error: "image should be les than 1mb" });
      }
      if (files.image3.size > 1000000) {
        return res.status(400).json({ error: "image should be les than 1mb" });
      }
      const {
        name,
        duration,
        summary,
        description,
        startDates,
        startLocation,
      } = fields;

      if (!name || !duration || !summary || !description || !startLocation) {
        return res.status(400).json({
          error: "all fields are required!",
        });
      }

      tours.imageCover.data = fs.readFileSync(files.imageCover.filepath);
      tours.imageCover.contentType = files.imageCover.mimetype;
      tours.image1.data = fs.readFileSync(files.image1.filepath);
      tours.image1.contentType = files.image1.mimetype;
      tours.image2.data = fs.readFileSync(files.image2.filepath);
      tours.image2.contentType = files.image2.mimetype;
      tours.image3.data = fs.readFileSync(files.image3.filepath);
      tours.image3.contentType = files.image3.mimetype;
    }

    tours.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  });
};

exports.updateTour = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).send("error");
    }

    let tours = new Tour(fields);
    if (
      files.imageCover &&
      files.image1 &&
      files.image2 &&
      files.image1 &&
      files.image3
    ) {
      if (files.imageCover.size > 1000000) {
        return res.status(400).json({ error: "file should be les than 1mb" });
      }
      if (files.image1.size > 1000000) {
        return res.status(400).json({ error: "file should be les than 1mb" });
      }
      if (files.image2.size > 1000000) {
        return res.status(400).json({ error: "file should be les than 1mb" });
      }
      if (files.image3.size > 1000000) {
        return res.status(400).json({ error: "file should be les than 1mb" });
      }

      tours.imageCover.data = fs.readFileSync(files.imageCover.filepath);
      tours.imageCover.contentType = files.imageCover.mimetype;
      tours.image1.data = fs.readFileSync(files.image1.filepath);
      tours.image1.contentType = files.image1.mimetype;
      tours.image2.data = fs.readFileSync(files.image2.filepath);
      tours.image2.contentType = files.image2.mimetype;
      tours.image3.data = fs.readFileSync(files.image3.filepath);
      tours.image3.contentType = files.image3.mimetype;
    }
  });
  Tour.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
    (err, tour) => {
      if (err || !tour) {
        return res.status(404).send("tour not found");
      }

      res.status(201).send(tour);
    }
  );
};

exports.remove = async (req, res) => {
  try {
    const tour = await Tour.findOneAndDelete({
      _id: req.params.id,
    });

    if (!tour) {
      res.status(404).send("tour not found");
    }

    res.send("tour removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};

exports.tourByid = async (req, res) => {
  try {
    const tour = await Tour.findOne({
      _id: req.params.id,
    });

    if (!tour) {
      return res.status(404).send("tour doesn't exist");
    }

    res.send(tour);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.allTours = (req, res) => {
  Tour.find({}, (err, tours) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(tours);
  });
};
