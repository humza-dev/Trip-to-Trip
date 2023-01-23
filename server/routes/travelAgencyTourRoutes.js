const express = require("express");
const upload = require("../handlers/multer");

const {
  createTour,
  allTours,
  tourByid,
  remove,
  updateTour,
} = require("../controllers/travelagencyTourController");
const router = express.Router();

router.post(
  "/createtour",
  upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createTour
);
router.get("/travelagencytours", allTours);
router.get("/:id", tourByid);
router.delete("/:id", remove);
router.patch(
  "/:id",
  upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateTour
);

module.exports = router;
