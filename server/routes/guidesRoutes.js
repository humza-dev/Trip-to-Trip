const express = require("express");
const routes = express.Router();
const upload = require("../handlers/multer");

const {
  signup,
  signin,
  signout,
  read,
  update,
  remove,
  readall,
} = require("../controllers/guidesController");
routes.post(
  "/signup",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "guidelicense", maxCount: 1 },
  ]),
  signup
);
routes.get("/signin", signin);
routes.get("/signout", signout);
routes.get("/:userID", read);
routes.get("/guides", readall);
routes.put(
  "/:userID",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "guidelicense", maxCount: 1 },
  ]),
  update
);
routes.delete("/:userID", remove);

module.exports = routes;
