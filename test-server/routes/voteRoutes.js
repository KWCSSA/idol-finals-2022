const express = require("express");
const app = express();
const router = express.Router();
const Vote = require("./schemas/voteSchema");
const Round = require("./schemas/roundSchema");
const bodyParser = require("body-parser").json();
const hash = require("object-hash");
const authAdmin = require("./auth/authAdmin");

const roundIDToIdx = {
  semiFinal1: 0,
  semiFinal2: 1,
  semiFinal3: 2,
  repechage: 3,
  final: 4,
};

const addVotesToRoundDatabase = async (res, candidateIdx, votes) => {
  const round = await Round.findOne({});
  const newVotes = round.votes;
  newVotes[candidateIdx] += votes;
  const update = {
    votes: newVotes,
  };
  await Round.findOneAndUpdate({}, update).then((result) => {
    return res.sendStatus(200);
  });
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Admin Reset DB
router.put("/b53c0dd8cba768c0140858250c36a9e1", async (req, res, next) => {
  console.log(`[ADMIN] Resetting DB`);
  await Vote.deleteMany({});
  let count = 0;
  for (let i = 1; i <= 250; ++i) {
    const newVote = {
      audienceID: i,
      voted: [false, false, false, false, false],
      voteHistory: [-1, -1, -1, -1, -1], // candidate index
    };
    await Vote.create(newVote)
      .then((res) => {
        ++count;
      })
      .catch((err) => {
        return res.sendStatus(400);
      });
  }
  console.log(`[ADMIN] Reset DB Done`);
  return res.sendStatus(200);
});

// Audience Vote
router.post("/", bodyParser, async (req, res, next) => {
  const candidateIdx = req.body.candidateIndex;
  const id = req.body.id;
  const auth = req.body.auth;
  // valid auth
  const validAuth = hash(`${id}kwcssaidols`, { algorithm: "md5" });
  if (auth !== validAuth) {
    return res.status(400).send({ message: "AUTH_ERROR" });
  }
  const round = await Round.findOne({});
  // check if current round isVoting
  if (!round.isVoting) {
    return res.status(400).send({ message: "VOTE_CLOSED" });
  }
  const roundIdx = roundIDToIdx[round.roundID];
  const candidatesNum = round.names.length;

  // check if button is valid
  if (candidateIdx < 0 || candidateIdx >= candidatesNum) {
    return res.status(400).send({ message: "FINAL_BUTTON" });
  }

  const audienceIDFilter = {
    audienceID: id,
  };

  // check if voted
  const vote = await Vote.findOne(audienceIDFilter);

  if (vote["voted"][roundIdx]) {
    return res.status(400).send({ message: "VOTED" });
  }

  try {
    // update vote
    const newVoted = vote.voted;
    newVoted[roundIdx] = true;
    const newVoteHistory = vote.voteHistory;
    newVoteHistory[roundIdx] = candidateIdx;

    const update = {
      voted: newVoted,
      voteHistory: newVoteHistory,
    };

    await addVotesToRoundDatabase(res, candidateIdx, 1);
    await Vote.findOneAndUpdate(audienceIDFilter, update);
    console.log(`[VOTE] Audience ${id} voted for candidate ${candidateIdx}`);
    return res.sendStatus(200);
  } catch {
    (err) => {
      return res.status(400).send({ message: "DEBUG" });
    };
  }
});

//Admin Vote
router.put("/:candidateIndex", bodyParser, async (req, res, next) => {
  const ADMIN_ID = "it-kwcssa-2022";
  const ADMIN_TOKEN = "b53c0dd8cba768c0140858250c36a9e1";
  const adminID = req.body.adminID;
  const adminToken = req.body.adminToken;
  if (adminID === ADMIN_ID && adminToken === ADMIN_TOKEN) {
    const candidateIdx = req.params.candidateIndex;
    const votesAdded = req.body.votesAdded;
    if (!votesAdded) {
      return res.status(400).send({ message: "VOTE_FAILED" });
    }
    await addVotesToRoundDatabase(res, candidateIdx, votesAdded).catch(
      (result) => {
        return res.status(400).send({ message: "VOTE_FAILED" });
      }
    );
    console.log(`[ADMIN] Add ${votesAdded} votes to candidate ${candidateIdx}`);
  } else {
    res.status(403).send({ message: "ADMIN_AUTH_ERROR" });
  }
});

module.exports = router;
