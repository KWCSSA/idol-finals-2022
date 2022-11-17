const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://it-kwcssa:NqHdbozqpPY9Psrn@cluster0.33koo.mongodb.net/final"
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
