const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");


const PORT = process.env.PORT || 3000;



const app = express();

//middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/",apiRoutes);
app.use("/",htmlRoutes);



mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitnessTrackerDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false,
  }
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

module.exports = app;
