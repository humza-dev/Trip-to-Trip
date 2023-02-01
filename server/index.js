const express = require("express");
require("dotenv").config();
require("./Database/db"); //!database
const cors = require("cors");
const bodyparser = require("body-parser");
const passport = require("passport");

const userRoutes = require("./routes/userRoutes");
const securityagencyRoutes = require("./routes/securityAgencyRoutes");
const SecurityHiringRoutes = require("./routes/SecurityHiringRoutes");
const guidesRoutes = require("./routes/guidesRoutes");
const guidetourRoutes = require("./routes/guidetourRoutes");
const GuideHiringRoutes = require("./routes/guideHiringRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const travelagencyRoutes = require("./routes/travelagencyRoutes");
const travelagencyTourRoutes = require("./routes/travelAgencyTourRoutes");
const travelagencyBookingRoutes = require("./routes/travelAgencyBookingRoutes");

const port = process.env.PORT || 5001;

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(passport.initialize());
require("./handlers/passport")(passport);

//Routes
app.use("/api/user", userRoutes);
app.use("/api/securityagency", securityagencyRoutes);
app.use("/api/securityhiring", SecurityHiringRoutes);
app.use("/api/guides", guidesRoutes);
app.use("/api/guidetour", guidetourRoutes);
app.use("/api/guidehiring", GuideHiringRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/travelagencytour", travelagencyTourRoutes);
app.use("/api/travelagency", travelagencyRoutes);
app.use("/api/travelagencybooking", travelagencyBookingRoutes);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
