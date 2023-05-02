const express = require("express");
const routes = express.Router();
const upload = require("../handlers/multer");
const auth = require("../controllers/Auth");

const { read, update, readall } = require("../controllers/guidesController");
routes.post(
  "/guide_join",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "guidelicense", maxCount: 1 },
  ]),
  auth.GuideSignup
);
// routes.get("/:id", read);
// routes.get("/guides", auth.userAuth, auth.checkRole(["admin"]), readall);
// routes.put(
//   "/:id",
//   auth.userAuth,
//   auth.checkRole(["admin"]),

//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "guidelicense", maxCount: 1 },
//   ]),
//   update
// );
// routes.delete("/:id", auth.userAuth, auth.checkRole(["admin"]), auth.remove);

module.exports = routes;
