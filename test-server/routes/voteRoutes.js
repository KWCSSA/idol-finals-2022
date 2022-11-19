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
router.put("/init", bodyParser, authAdmin, async (req, res, next) => {
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
    console.log(`[VOTE] WARN: Audience ${id} - AUTH_ERROR`);
    return res.status(400).send({ message: "AUTH_ERROR" });
  }
  const round = await Round.findOne({});
  // check if current round isVoting
  if (!round.isVoting) {
    console.log(`[VOTE] WARN: Audience ${id} - VOTE_CLOSED`);
    return res.status(400).send({ message: "VOTE_CLOSED" });
  }
  // console.log("1:round: ", round);
  const roundIdx = roundIDToIdx[round.roundID];
  // console.log("2:roundIdx: ", roundIdx);

  const candidatesNum = round.names.length;
  // console.log("3:candidatesNum: ", candidatesNum);

  // check if button is valid
  // console.log("test FINAL_BUTTON", candidateIdx, candidatesNum);
  if (candidateIdx < 0 || candidateIdx >= candidatesNum) {
    console.log(`[VOTE] WARN: Audience ${id} - FINAL_BUTTON`);
    return res.status(400).send({ message: "FINAL_BUTTON" });
  }

  const audienceIDFilter = {
    audienceID: id,
  };
  // console.log("4:audienceIDFilter: ", audienceIDFilter);

  // check if voted
  const vote = await Vote.findOne(audienceIDFilter);
  // console.log("5:vote: ", vote);

  if (vote["voted"][roundIdx]) {
    console.log(`[VOTE] WARN: Audience ${id} - VOTED`);
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
    // console.log("Vote.findOneAndUpdate", audienceIDFilter, update);
    await Vote.findOneAndUpdate(audienceIDFilter, update);
    console.log(`[VOTE] Audience ${id} voted for candidate ${candidateIdx}`);
    return res.sendStatus(200);
  } catch {
    (err) => {
      return res.status(400).send({ message: "DEBUG" });
    };
  }
});

// Admin Vote
// router.put(
//   "/:candidateIndex",
//   bodyParser,
//   authAdmin,
//   async (req, res, next) => {
//     console.log("candidateIdx", req.params.candidateIdx);
//     const candidateIdx = req.params.candidateIndex;
//     const votesAdded = req.body.votesAdded;
//     if (!votesAdded) {
//       return res.status(400).send({ message: "VOTE_FAILED" });
//     }
//     await addVotesToRoundDatabase(res, candidateIdx, votesAdded)
//       .catch((result) => {
//         return res.status(400).send({ message: "VOTE_FAILED" });
//       })
//       .then(() => {
//         console.log(
//           `[ADMIN] Add ${votesAdded} votes to candidate ${candidateIdx}`
//         );
//         return res.sendStatus(200);
//       });
//   }
// );

module.exports = router;
