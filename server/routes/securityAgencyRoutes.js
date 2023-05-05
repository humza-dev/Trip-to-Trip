const express = require("express");
const upload = require("../handlers/multer");
const auth = require("../controllers/Auth");

const router = express.Router();

// const {
//   read,
//   readall,
//   update,
// } = require("../controllers/securityagencyController");

router.post(
  "/company_join",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "companylicense", maxCount: 1 },
  ]),
  auth.SecurityAgencySignup
);
// router.get("/signin", auth.signin);
// router.get("/signout", auth.signout);
// router.get("/:id", auth.userAuth, auth.checkRole(["admin"]), read);
// router.get(
//   "/securityagencies",
//   auth.userAuth,
//   auth.checkRole(["admin"]),
//   readall
// );
// router.patch(
//   "/:id",
//   auth.userAuth,
//   auth.checkRole(["admin"]),
//   upload.single("companylicense"),
//   update
// );
// router.delete("/:id", auth.userAuth, auth.checkRole(["admin"]), auth.remove);

module.exports = router;
