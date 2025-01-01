const express = require('express');
const router = express.Router();
const { writeShipData } = require('./db');
const gameNo = 9;

const secretCodes = [
    "6209", "8137", "8402", "9634", "7019", "2834", "9061", "3876", "5709", "9501",
    "1269", "7930", "7069", "8125", "5293", "3196", "1795", "8635", "7930", "7481",
    "4238", "8710", "9732", "8650", "9502", "8135", "3945", "9734", "4529", "2584",
    "8637", "4823", "6781", "2953", "0695", "8076", "3518", "9573", "7148", "6582"
];

router.get('/getBullsNCows', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo);
    const guessedNo = String(req.query.guessedNo);
    const secretCode = secretCodes[shipNo - 11];
    const guessedArray = guessedNo.split('');
    const secretArray = secretCode.split('');

    let bulls = 0;
    let cows = 0;

    const secretMatched = Array(secretArray.length).fill(false);
    const guessedMatched = Array(guessedArray.length).fill(false);

    for (let i = 0; i < secretArray.length; i++) {
        if (guessedArray[i] === secretArray[i]) {
            bulls++;
            secretMatched[i] = true;
            guessedMatched[i] = true;
        }
    }

    for (let i = 0; i < guessedArray.length; i++) {
        if (!guessedMatched[i]) {
            for (let j = 0; j < secretArray.length; j++) {
                if (!secretMatched[j] && guessedArray[i] === secretArray[j]) {
                    cows++;
                    secretMatched[j] = true;
                    break;
                }
            }
        }
    }

    const result = [guessedNo, bulls, cows];

    if (bulls === 4) {
        await writeShipData('Unlocked', shipNo, gameNo, 1);
        await writeShipData('Solved', shipNo, gameNo, 1);
    }

    res.json({ verdictArray: result });
});

module.exports = router;
