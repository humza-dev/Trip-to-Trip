const express = require("express");
const router = express.Router();
const auth = require("../controllers/Auth");

// const {
//   update,
//   remove,
//   read,
//   getMyGuideTours,
//   getMySecurityHirings,
// } = require("../controllers/userController");
//guide tours
// router.get(
//   "/my-guidetours",
//   auth.userAuth,
//   auth.checkRole(["admin", "user"]),
//   getMyGuideTours
// );

//TODO:get user's security hirings
// router.get(
//   "/my-security-hirings",
//   auth.userAuth,
//   auth.checkRole(["admin", "user"]),
//   getMySecurityHirings
// );

router.post("/signup", auth.UserSignup);
router.post("/signin", auth.signin);


// router.get("/signout", auth.signout);
// router.get("/:id", auth.userAuth, auth.checkRole(["admin"]), read);
// router.get("/", auth.userAuth, auth.checkRole(["admin"]), auth.readall); //get all users
// router.patch("/:id", auth.userAuth, auth.checkRole(["admin"]), update); //admin update user
// router.delete("/:id", auth.userAuth, auth.checkRole(["admin"]), remove);

module.exports = router;
