const express = require("express");
require("dotenv").config();
const app = express();
const port = 8080;
const mongoose = require("mongoose");
mongoose.connect(`${process.env.MONGODB}/final`)
  .then(() => {
    console.log("database connection successful.");
  })
  .catch((err) => {
    console.log("database connection error." + err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


const roundRoute = require("./routes/roundRoutes");
const voteRoute = require("./routes/voteRoutes");

app.use("/round", roundRoute);
app.use("/vote", voteRoute);
