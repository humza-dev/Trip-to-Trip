const express = require("express");
require("dotenv").config();
require("./Database/db"); //database
const cors = require("cors");
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const securityagencyRoutes = require("./routes/securityAgencyRoutes");
const travelagencyRoutes = require("./routes/travelagencyRoutes");
const guidesRoutes = require("./routes/guidesRoutes");
const guidetourRoutes = require("./routes/guidetourRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const travelagencyTourRoutes = require("./routes/travelAgencyTourRoutes");

const port = process.env.PORT || 5001;

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookieparser());

//routes
app.use("/api", userRoutes);
app.use("/api", securityagencyRoutes);
app.use("/api", travelagencyRoutes);
app.use("/api", guidesRoutes);
app.use("/api", guidetourRoutes);
app.use("/api", reviewRoutes);
app.use("/api", travelagencyTourRoutes);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
