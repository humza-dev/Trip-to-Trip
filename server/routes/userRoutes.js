const express = require("express");
const router = express.Router();
const {
  signin,
  signout,
  update,
  remove,
  readall,
  read,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/signup", auth.signup);
router.post("/signin", auth.signin);
router.get("/signout", signout);
router.get("/:id", read);
router.get("users", readall);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
