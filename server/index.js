const express = require("express");
require("dotenv").config();
require("./Database/db"); //database
const cors = require("cors");
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const securityagencyRoutes = require("./routes/securityAgencyRoutes");
const travelagencyRoutes = require("./routes/travelagencyRoutes");
const guidesRoutes = require("./routes/guides");

const port = process.env.PORT || 5001;

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookieparser());

//routes
app.use("/api", userRoutes);
app.use("/api", securityagencyRoutes);
app.use("/api", travelagencyRoutes);
app.use("/api", guidesRoutes);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
