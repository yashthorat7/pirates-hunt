const express = require('express');
const router = express.Router();
const gameNo = 6;
const { writeShipData } = require('./db');

const pirateWords = [
    "SHARK", "SWORD", "STORY", "COUNT",
    "CHEST", "SKULL", "BLACK", "WHITE",
    "STORM", "CORAL", "MUSIC", "DANCE",
    "SOUND", "RUMOR", "SLEEP", "SCORE"
];

const assignedWord = new Array(40).fill(null);

function getWord(shipNo) {
    const randomIndex = Math.floor(Math.random() * pirateWords.length);
    const randomWord = pirateWords[randomIndex];
    assignedWord[shipNo] = randomWord;
    return randomWord;
}

router.get('/getWord', (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    getWord(shipNo);
    res.json("done");
});

router.get('/getWordWin', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const chosenAnswer = req.query.chosenAnswer;

    const word = assignedWord[shipNo];
    const result = new Array(5).fill(0);
    const cArr = chosenAnswer.split('');
    const wArr = word.split('');
    const matchedIdx = new Set();
    const wCount = {};
    const cCount = {}; 

    for (let i = 0; i < 5; i++) {
        wCount[wArr[i]] = (wCount[wArr[i]] || 0) + 1;
        cCount[cArr[i]] = (cCount[cArr[i]] || 0) + 1;
    }

    for (let i = 0; i < 5; i++) {
        if (wArr[i] === cArr[i]) {
            result[i] = 2;
            matchedIdx.add(i);
            wCount[wArr[i]]--;
            cCount[cArr[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i] === 0 && wArr[i] !== cArr[i]) {
            if (wCount[cArr[i]] > 0) {
                result[i] = 1;
                wCount[cArr[i]]--;
            }
        }
    }

    const isCorrect = word === chosenAnswer;
    if (isCorrect) {
        await writeShipData('Unlocked', shipNo, gameNo, 1);
        await writeShipData('Solved', shipNo, gameNo, 1);
    }

    res.json({ verdictArray: result });
});

module.exports = router;
