const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  read,
  update,
  remove,
} = require("../controllers/securityagencyController");

router.post("/securityagency/signup", signup);
router.get("/securityagency/signin", signin);
router.get("/securityagency/signout", signout);
router.get("/securityagency/:userID", read);
router.patch("/securityagency/:userID", update);
router.delete("/securityagency/:userID", remove);

module.exports = router;