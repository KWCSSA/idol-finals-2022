const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoundSchema = new Schema(
  {
    roundID: { String },
    isVoting: Boolean,
    names: [String],
    votes: [Number],
  },
  { timestamps: true }
);

var Round = mongoose.model("Round", RoundSchema);
module.exports = Round;
