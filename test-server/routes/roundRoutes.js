const express = require("express");
const app = express();
const router = express.Router();
const Round = require("./schemas/roundSchema");
const bodyParser = require("body-parser").json();
const authAdmin = require("./auth/authAdmin");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Admin init
router.post("/init/:roundID", bodyParser, authAdmin, async (req, res, next) => {
  const roundID = req.params.roundID;
  const names = req.body.candidateNames;

  // console.log("names:", names);
  const votes = Array(names.length).fill(0);
  const updateDocument = {
    $set: {
      isVoting: false,
      roundID,
      names,
      votes,
    },
  };
  await Round.updateOne({}, updateDocument)
    .then((_res) => {
      console.log(`=============${roundID}==============`);
      console.log(`[ADMIN] ${roundID} initialized ====> candidates=${names}`);
      return res.sendStatus(200);
    })
    .catch((err) => {
      return res.sendStatus(400);
    });
});

// PUT /round/start
router.put("/start", bodyParser, authAdmin, async (req, res, next) => {
  const updateDocument = {
    isVoting: true,
  };
  await Round.findOneAndUpdate({}, updateDocument)
    .then((_res) => {
      console.log(`>>>>>>Voting Channel Open>>>>>>`);
      return res.sendStatus(200);
    })
    .catch((err) => {
      return res.status(400).send("Round not initialized");
    });
});

// PUT /round/end
router.put("/end", bodyParser, authAdmin, async (req, res, next) => {
  const updateDocument = {
    isVoting: false,
  };
  await Round.findOneAndUpdate({}, updateDocument)
    .then((_res) => {
      console.log(`<<<<<<Voting Channel Closed<<<<<<`);
      return res.sendStatus(200);
    })
    .catch((err) => {
      return res.status(400).send("Round not initialized");
    });
});

// GET /round
router.get("/", async (req, res, next) => {
  const ADMIN_ID = "it-kwcssa-2022";
  const ADMIN_TOKEN = "b53c0dd8cba768c0140858250c36a9e1";
  // console.log("req", req);
  // console.log("req.params", req.params);
  // console.log("req.query", req.query);
  // console.log("req.body", req.body);
  const adminID = req.query.adminID;
  const adminToken = req.query.adminToken;
  // console.log(ADMIN_ID, adminID, ADMIN_TOKEN, adminToken);
  // console.log(
  //   typeof ADMIN_ID,
  //   typeof adminID,
  //   typeof ADMIN_TOKEN,
  //   typeof adminToken
  // );
  if (adminID === ADMIN_ID && adminToken === ADMIN_TOKEN) {
    const round = await Round.findOne({});
    console.log(
      `[DISPLAY] Fetch ${round.roundID} (${
        round.isVoting ? "VotingON" : "VotingOFF"
      }) votes: `
    );
    for (let i = 0; i < round.names.length; i++) {
      console.log(`${round.names[i]}: ${round.votes[i]}`);
    }
    return res.status(200).send(round);
  } else {
    res.status(403).send({ message: "ADMIN_AUTH_ERROR" });
  }
});

module.exports = router;
