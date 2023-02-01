const express = require("express");
const upload = require("../handlers/multer");
const auth = require("../middlewares/auth");

const router = express.Router();
const {
  read,
  readall,
  update,
} = require("../controllers/travelagencyControllers");

router.post(
  "/signup",
  upload.single("companylicense"),
  auth.TravelAgencySignup
);
router.get("/signin", auth.signin);
router.get("/signout", auth.signout);
router.get("/:id", auth.userAuth, auth.checkRole(["admin"]), read);
router.get(
  "/travelagencies",
  auth.userAuth,
  auth.checkRole(["admin"]),
  readall
);
router.patch(
  "/:id",
  auth.userAuth,
  auth.checkRole(["admin"]),

  upload.single("companylicense"),
  update
);
router.delete("/:id", auth.userAuth, auth.checkRole(["admin"]), auth.remove);

module.exports = router;
