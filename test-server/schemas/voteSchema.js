const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    audienceID: Number,
    auth: String,
    voted: [Boolean],
    voteHistory: [Number]
}, { timestamps: true });

var Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;