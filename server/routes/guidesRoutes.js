const express = require("express");
const routes = express.Router();

const {
  signup,
  signin,
  signout,
  read,
  update,
  remove,
  readall,
} = require("../controllers/guidesController");
routes.post("/guides/signup", signup);
routes.get("/guides/signin", signin);
routes.get("/guides/signout", signout);
routes.get("/guides/:userID", read);
routes.get("/guides", readall);
routes.patch("/guides/:userID", update);
routes.delete("/guides/:userID", remove);

module.exports = routes;
