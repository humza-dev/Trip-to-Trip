const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  read,
  update,
  remove,
} = require("../controllers/travelagencyControllers");

router.post("/travelagency/signup", signup);
router.get("/travelagency/signin", signin);
router.get("/travelagency/signout", signout);
router.get("/travelagency/:userID", read);
router.patch("/travelagency/:userID", update);
router.delete("/travelagency/:userID", remove);

module.exports = router;
