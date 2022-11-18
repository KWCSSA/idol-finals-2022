const express = require("express");
const app = express();
const router = express.Router();
const Vote = require("../schemas/VoteSchema");
const Round = require("../schemas/RoundSchema")
const bodyParser = require('body-parser').json();
const hash = require('object-hash');

const roundIDToIdx = {
    "semiFinal1": 0,
    "semiFinal2": 1,
    "semiFinal3": 2,
    "repechage": 3,
    "final": 4
}

const addVotesToRoundDatabase = async (res, candidateIdx, votes) => {
    const round = await Round.findOne({});
    const newVotes = round.votes;
    newVotes[candidateIdx] += votes;
    const update = {
        votes: newVotes
    }
    await Round.findOneAndUpdate({}, update)
        .then(result => {
            return res.sendStatus(200);
        })

}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for internal use
router.put("/init", async (req, res, next) => {
    await Vote.deleteMany({});
    let count = 0;
    for (let i = 1; i <= 250; ++i) {
        const newVote = {
            audienceID: i,
            voted: [false, false, false, false, false],
            voteHistory: [-1, -1, -1, -1, -1] // candidate index
        };
        await Vote.create(newVote)
            .then(res => {
                ++count;
            })
            .catch(err => {
                return res.sendStatus(400);
            })
    }
    return res.sendStatus(200);
})

// POST /vote/
router.post("/", bodyParser, async (req, res, next) => {
    const candidateIdx = req.body.candidateIndex;
    const id = req.body.id;
    const auth = req.body.auth;
    // valid auth
    const validAuth = hash(`${id}kwcssaidols`, { algorithm: 'md5' });
    if (auth !== validAuth) {
        return res.status(400).send("AUTH_ERROR")
    }

    const round = await Round.findOne({});
    const roundIdx = roundIDToIdx[round.roundID];
    const candidatesNum = round.names.length;

    // check if button is valid
    if (!roundIdx || candidateIdx < 0 || candidateIdx >= candidatesNum) {
        return res.status(400).send("FINAL_BUTTON")
    }

    const audienceIDFilter = {
        audienceID: id
    };

    // check if voted
    const vote = await Vote.findOne(audienceIDFilter)
    if (vote[roundIdx]) {
        return res.status(400).send("VOTED")
    }

    try {

        // update vote 
        const newVoted = vote.voted;
        newVoted[roundIdx] = true;
        const newVoteHistory = vote.voteHistory;
        newVoteHistory[roundIdx] = candidateIdx;

        const update = {
            voted: newVoted,
            voteHistory: newVoteHistory
        }

        // check if current round isVoting
        if (!round.isVoting || round.roundID !== req.params.roundID) {
            return res.status(400).send("VOTE_CLOSED")
        }

        await addVotesToRoundDatabase(res, candidateIdx, 1);
        await Vote.findOneAndUpdate(audienceIDFilter, update)

        return res.sendStatus(200)

    } catch {
        err => {
            return res.status(400).send("DEBUG")
        }
    }

});

// PUT /vote/{candidateIndex}
router.put("/:candidateIndex", bodyParser, async (req, res, next) => {
    const candidateIdx = req.params.candidateIndex;
    const votesAdded = req.body.votesAdded;
    if (!votesAdded) {
        return res.status(400).send('VOTE_FAILED')
    }
    await addVotesToRoundDatabase(res, candidateIdx, votesAdded)
        .catch(result => {
            return res.status(400).send('VOTE_FAILED')
        })


})

module.exports = router;
