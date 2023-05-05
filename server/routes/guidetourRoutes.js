const express = require("express");
const router = express.Router();
const upload = require("../handlers/multer");
const auth = require("../controllers/Auth");

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
// router.patch(
//   "/:id",
//   auth.userAuth,
//   auth.checkRole(["admin", "guide"]),
//   upload.fields([
//     { name: "imageCover", maxCount: 1 },
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//   ]),
//   updateTour
// );
// router.delete(
//   "/:id",
//   auth.userAuth,
//   auth.checkRole(["admin", "guide"]),
//   remove
// );
// router.get("/:id", auth.userAuth, auth.checkRole(["admin", "guide"]), tourByid);
router.get(
  "/tours",

  allTours
);

module.exports = router;
