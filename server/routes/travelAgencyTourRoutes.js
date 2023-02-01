const express = require("express");
const upload = require("../handlers/multer");
const auth = require("../middlewares/auth");

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
  auth.userAuth,
  auth.checkRole(["admin", "travelagency"]),
  upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createTour
);
router.get(
  "/travelagencytours",
  auth.userAuth,
  auth.checkRole(["admin", "travelagency"]),
  allTours
);
router.get(
  "/:id",
  auth.userAuth,
  auth.checkRole(["admin", "travelagency"]),
  tourByid
);
router.delete(
  "/:id",
  auth.userAuth,
  auth.checkRole(["admin", "travelagency"]),
  remove
);
router.patch(
  " /:id",
  auth.userAuth,
  auth.checkRole(["admin", "travelagency"]),
  upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateTour
);

module.exports = router;
