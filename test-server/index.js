const express = require("express");
require("dotenv").config();
const app = express();
const port = 8080;
const mongoose = require("mongoose");
mongoose.connect(`${process.env.MONGODB}/final`);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
