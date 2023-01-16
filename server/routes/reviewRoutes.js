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
router.get("/review/:id", getReview);
router.post("/reviews", createReview);
router.patch("/review/:id", updateReview);
router.delete("/review/:id", removeReview);

module.exports = router;
