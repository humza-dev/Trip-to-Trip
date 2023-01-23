const express = require("express");
const upload = require("../handlers/multer");

const router = express.Router();
const {
  signup,
  signin,
  signout,
  update,
  remove,
  readall,
  read,
} = require("../controllers/userController");

router.post("/signup", upload.single("avatar"), signup);
router.get("/signin", signin);
router.get("/signout", signout);
router.get("/:userID", read);
router.get("users", readall);
router.patch("/:userID", upload.single("avatar"), update);
router.delete("/:userID", remove);

module.exports = router;
