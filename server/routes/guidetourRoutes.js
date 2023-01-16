const express = require("express");
const router = express.Router();
const {
  createTour,
  updateTour,
  remove,
  tourByid,
  allTours,
} = require("../controllers/guidetourControllers");

router.post("/guidetour/createtour", createTour);
router.patch("/guidetour/:id", updateTour);
router.delete("/guidetour/:id", remove);
router.get("/guidetour/:id", tourByid);
router.get("/guidetours", allTours);

module.exports = router;
