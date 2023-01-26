const express = require("express");
const router = express.Router();

const {
  createHiring,
  getAllHirings,
  getHiringById,
  updateHiring,
  deleteHiring,
} = require("../controllers/SecurityHiringController");

router.post("/create", createHiring);
router.get("/all", getAllHirings);
router.put("/update/:id", updateHiring);
router.get("/:id", getHiringById);
router.delete("/delete/:id", deleteHiring);

module.exports = router;
