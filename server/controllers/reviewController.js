const Review = require("../models/review");

exports.getAllReviews = (req, res) => {
  Review.find({}, (err, tours) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(tours);
  });
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
  const doc = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: { data: doc },
  });
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
exports.updateReview = (req, res) => {
  Review.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
    (err, review) => {
      if (req.body.rating > 5 || req.body.rating < 1) {
        res.status(400).json("rating should be between 1 and 5");
      }

      res.status(200).send(review);
    }
  );
};
