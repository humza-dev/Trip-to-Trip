const Tour = require("../models/guideTour");
require("../handlers/cloudinary");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//guide tour
exports.createTour = async (req, res) => {
  try {
    let {
      location,
      duration,
      ratingsAverage,
      ratingsQuantity,
      price,
      summary,
      description,
      startDates,
      startLocation,
      guide,
      title,
    } = req.body;
    // if (
    //   !location ||
    //   !duration ||
    //   !price ||
    //   !summary ||
    //   !title||
    //   !description ||
    //   !startDates ||
    //   !startLocation ||
    //   !guide
    // ) {
    //   return res.status(400).send("all fields are required");
    // }

    //tour images upload
    let imageCover = await cloudinary.uploader.upload(
      req.files.imageCover[0].path
    );
    let image1 = await cloudinary.uploader.upload(req.files.image1[0].path);
    let image2 = await cloudinary.uploader.upload(req.files.image2[0].path);
    let image3 = await cloudinary.uploader.upload(req.files.image3[0].path);
    fs.unlink(req.files.imageCover[0].path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fs.unlink(req.files.image1[0].path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fs.unlink(req.files.image2[0].path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fs.unlink(req.files.image3[0].path, (err) => {
      if (err) {
        console.log(err);
      }
    });

    // Create new tour
    let tour = new Tour({
      location: req.body.location,
      duration: req.body.duration,
      ratingsAverage: req.body.ratingsAverage,
      ratingsQuantity: req.body.ratingsQuantity,
      price: req.body.price,
      summary: req.body.summary,
      description: req.body.description,
      startDates: req.body.startDates,
      startLocation: req.body.startLocation,
      imageCover: imageCover.secure_url,
      image1: image1.secure_url,
      image2: image2.secure_url,
      image3: image3.secure_url,
      title: req.body.title,

      guide: req.body.guide,
    });
    // Save guide
    await tour.save();

    res.status(201).json(tour);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const {
      location,
      duration,
      ratingsAverage,
      ratingsQuantity,
      price,
      summary,
      description,
      startDates,
      guide,
      startLocation,
    } = req.body;

    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    let imageCoverURL = null;
    let image1URL = null;
    let image2URL = null;
    let image3URL = null;

    if (req.files.imageCover) {
      const imageCover = await cloudinary.uploader.upload(
        req.files.imageCover[0].path
      );
      imageCoverURL = imageCover.secure_url;

      fs.unlink(req.files.imageCover[0].path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (req.files.image1) {
      const image1 = await cloudinary.uploader.upload(req.files.image1[0].path);
      image1URL = image1.secure_url;

      fs.unlink(req.files.image1[0].path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (req.files.image2) {
      const image2 = await cloudinary.uploader.upload(req.files.image2[0].path);
      image2URL = image2.secure_url;

      fs.unlink(req.files.image2[0].path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (req.files.image3) {
      const image3 = await cloudinary.uploader.upload(req.files.image3[0].path);
      image3URL = image3.secure_url;

      fs.unlink(req.files.image3[0].path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, {
      location,
      duration,
      ratingsAverage,
      ratingsQuantity,
      price,
      summary,
      description,
      startDates,
      startLocation,
      guide,
      imageCover: imageCoverURL,
      image1: image1URL,
      image2: image2URL,
      image3: image3URL,
    });

    await updatedTour.save();
    res.status(200).json("tour updated successfully");
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
  }
};

exports.remove = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    Tour.findByIdAndDelete(req.params.id);
    res.status(200).json("tour deleted successfully");
  } catch (e) {
    res.status(500).send();
  }
};

exports.tourByid = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.allTours = async (req, res) => {

      const { location } = req.query;

  try {
    const tours = await Tour.find({ location }).populate('guide','');
    res.json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
