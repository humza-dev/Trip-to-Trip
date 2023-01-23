const express = require("express");
const router = express.Router();
const upload = require("../handlers/multer");

const {
  createTour,
  updateTour,
  remove,
  tourByid,
  allTours,
} = require("../controllers/guidetourControllers");

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
router.delete("/:id", remove);
router.get("/:id", tourByid);
router.get("/guidetours", allTours);

module.exports = router;
