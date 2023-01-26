const TravelAgencytour = require("../models/TravelAgencytour");
const fs = require("fs");

require("../handlers/cloudinary");
const cloudinary = require("cloudinary").v2;

//guide tour
exports.createTour = async (req, res) => {
  try {
    let {
      name,
      duration,
      ratingsAverage,
      ratingsQuantity,
      price,
      summary,
      description,
      startDate,
      startLocation,
      travelAgency,
    } = req.body;
    if (
      !name ||
      !duration ||
      !ratingsAverage ||
      !ratingsQuantity ||
      !price ||
      !summary ||
      !description ||
      !startDate ||
      !startLocation ||
      !travelAgency
    ) {
      return res.status(400).send("all fields are required");
    }

    // let userExist = await Guides.findOne({ email: req.body.email });
    // if (userExist) {
    //   return res.status(400).send("That user already exisits!");
    // }
    //tour images upload
    let imageCover = await cloudinary.uploader.upload(
      req.files.imageCover[0].path
    );
    let image1 = await cloudinary.uploader.upload(req.files.image1[0].path);
    let image2 = await cloudinary.uploader.upload(req.files.image2[0].path);
    let image3 = await cloudinary.uploader.upload(req.files.image3[0].path);

    fs.unlink(req.files.imageCover[0].path, (err) => {
      res.status(err);
    });
    fs.unlink(req.files.image1[0].path, (err) => {
      res.status(err);
    });
    fs.unlink(req.files.image2[0].path, (err) => {
      res.status(err);
    });
    fs.unlink(req.files.image3[0].path, (err) => {
      res.status(err);
    });

    // Create new tour
    let tour = new TravelAgencytour({
      name: req.body.name,
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

      travelAgency: req.body.travelAgency,
    });
    // Save guide
    await tour.save();

    res.status(201).json(tour);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.allTours = async (req, res) => {
  try {
    let tour = req.query.tour ? req.query.tour : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    const tours = await TravelAgencytour.find({})
      .sort([[sortBy, tour]])
      .limit(limit);
    if (!tours) {
      return res.status(404).send("tourss not found");
    }
    res.status(200).send(tours);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.tourByid = async (req, res) => {
  try {
    const tour = await TravelAgencytour.findById({ _id: req.params.id });

    if (!tour) {
      return res.status(404).send("tour not found");
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
      return res.status(404).send("travelagencytour not found");
    }

    res.send("travelagencytour removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};

exports.updateTour = async (req, res) => {
  try {
    const {
      name,
      duration,
      ratingsAverage,
      ratingsQuantity,
      price,
      summary,
      description,
      startDates,
      travelAgency,
      startLocation,
    } = req.body;

    const tourExist = await TravelAgencytour.findById(req.params.id);
    if (!tourExist) {
      return res.status(404).send("tour not found");
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

    const updatedTour = await TravelAgencytour.findByIdAndUpdate(
      req.params.id,
      {
        name,
        duration,
        ratingsAverage,
        ratingsQuantity,
        price,
        summary,
        description,
        startDates,
        startLocation,
        travelAgency,
        imageCover: imageCoverURL,
        image1: image1URL,
        image2: image2URL,
        image3: image3URL,
      }
    );

    await updatedTour.save();

    res.status(200).json("tour updated successfully");
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: e.message });
  }
};
