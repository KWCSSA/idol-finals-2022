const express = require("express");
const app = express();
const router = express.Router();
const Round = require("../schemas/RoundSchema");
const bodyParser = require("body-parser").json();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for internal use
router.post("/init/:roundID", bodyParser, async (req, res, next) => {
  const roundID = req.params.roundID;
  const names = req.body.candidateNames;
  console.log("names:", names);
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
      return res.sendStatus(200);
    })
    .catch((err) => {
      return res.sendStatus(400);
    });
});

// PUT /round/start
router.put("/start", async (req, res, next) => {
  const updateDocument = {
    isVoting: true,
  };
  await Round.findOneAndUpdate({}, updateDocument)
    .then((_res) => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      return res.status(400).send("Round not initialized");
    });
});

// PUT /round/end
router.put("/end", async (req, res, next) => {
  const updateDocument = {
    isVoting: false,
  };
  await Round.findOneAndUpdate({}, updateDocument)
    .then((_res) => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      return res.status(400).send("Round not initialized");
    });
});

// GET /round
router.get("/", async (req, res, next) => {
  const round = await Round.findOne({});
  return res.status(200).send(round);
});

module.exports = router;
