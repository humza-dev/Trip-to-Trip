const express = require("express");
const {
  createTour,
  allTours,
  tourByid,
  remove,
} = require("../controllers/travelagencyTourController");
const router = express.Router();

router.post("/travelagencytour/createtour", createTour);
router.get("/travelagencytours", allTours);
router.get("/travelagencytour/:id", tourByid);
router.delete("/travelagencytour/:id", remove);

module.exports = router;
