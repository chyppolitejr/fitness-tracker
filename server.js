const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/apiRoutes");


const PORT = process.env.PORT || 3000;

//view engine

const app = express();

//middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use("/",routes);


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitnessTrackerDB",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

module.exports = app;
