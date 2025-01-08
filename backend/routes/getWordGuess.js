const express = require('express');
const router = express.Router();
const { gameData, runtimeData } = require('../data/gameDatabase');

router.get('/getWord', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const randomIndex = Math.floor(Math.random() * gameData.wordGuess.pirateWords.length);
    const randomWord = gameData.wordGuess.pirateWords[randomIndex];
    runtimeData.assignedWords[shipNo] = randomWord;
    res.json("done");
});

router.get('/getWordWin', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const chosenAnswer = req.query.chosenAnswer;

    const word = runtimeData.assignedWords[shipNo];
    if (!word) {
        return res.json({ error: "No word assigned to this ship number" });
    }

    const result = new Array(5).fill(0);
    const cArr = chosenAnswer.toUpperCase().split('');
    const wArr = word.toUpperCase().split('');
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
    console.log(result);
    res.json({ verdictArray: result });
});

module.exports = router;
