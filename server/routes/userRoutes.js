const express = require("express");

const router = express.Router();
const {
  signup,
  signin,
  signout,
  update,
  remove,
  read,
} = require("../controllers/userController");

router.post("/user/signup", signup);
router.get("/user/signin", signin);
router.get("/user/signout", signout);
router.get("/user/:userID", read);
router.patch("/user/:userID", update);
router.delete("/user/:userID", remove);

module.exports = router;
