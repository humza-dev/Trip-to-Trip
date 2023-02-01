const mongoose = require("mongoose");
mongoose
  .set("strictQuery", false)
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected Successfully!");
  });

mongoose.connection.on("error", (err) => {
  throw Error("Connection Error", err);
});
