const Review = require("../models/review");

exports.getAllReviews = async (req, res) => {
  try {
    let review = req.query.review ? req.query.review : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const reviews = await Review.find({})
      .sort([[sortBy, review]])
      .limit(limit);
    if (!reviews) {
      res.status(404).send("reviews not found");
    }
    res.status(200).send(reviews);
  } catch (e) {
    res.status(500).send();
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
    });

    if (!review) {
      return res.status(404).send("review doesn't exist");
    }

    res.send(review);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.createReview = async (req, res) => {
  try {
    const doc = await Review.create(req.body);

    res.status(201).json({
      status: "success",
      data: { data: doc },
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.removeReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
    });

    if (!review) {
      res.status(404).send("review not found");
    }

    res.send("review removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (req.body.rating > 5 || req.body.rating < 1) {
      res.status(400).json("review should be between 1 and 5");
    } else if (!review) {
      res.status(404).send("review not found");
    } else {
      review.save();
      res.status(201).send(review);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
