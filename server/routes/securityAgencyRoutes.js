const express = require("express");
const upload = require("../handlers/multer");

const router = express.Router();

const {
  signup,
  signin,
  signout,
  read,
  readall,
  update,
  remove,
} = require("../controllers/securityagencyController");

router.post("/signup", upload.single("companylicense"), signup);
router.get("/signin", signin);
router.get("/signout", signout);
router.get("/:userID", read);
router.get("/securityagencies", readall);
router.patch("/:userID", upload.single("companylicense"), update);
router.delete("/:userID", remove);

module.exports = router;
