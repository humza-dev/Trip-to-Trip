const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  removeReview,
} = require("../controllers/reviewController");

router.get("/reviews", getAllReviews);
router.get("/:id", getReview);
router.post("/", createReview);
router.patch("/:id", updateReview);
router.delete("/:id", removeReview);

module.exports = router;
