const express = require('express');
const router = express.Router();

const pirateWords = [
    "SHARK", "SWORD", "STORY", "COUNT",
    "CHEST", "SKULL", "BLACK", "WHITE",
    "STORM", "CORAL", "MUSIC", "DANCE",
    "SOUND", "RUMOR", "SLEEP", "SCORE"
];

const assignedWord = new Array(40).fill(null);

router.get('/getSaitama', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const randomIndex = Math.floor(Math.random() * pirateWords.length);
    const word = pirateWords[randomIndex];
    assignedWord[shipNo] = word;

    console.log(word);
    res.json({
        puzzleData: {
            word
        }
    });
});

router.get('/getSaitamaWin', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const chosenAnswer = JSON.parse(req.query.userInputs)?.toUpperCase();
    const word = assignedWord[shipNo]?.toUpperCase();

    if (!word || !chosenAnswer) {
        return res.json({ hasWon: false });
    }

    const result = new Array(5).fill(0);
    const wArr = word.split('');
    const cArr = chosenAnswer.split('');
    const letterCount = {};

    wArr.forEach(c => letterCount[c] = (letterCount[c] || 0) + 1);

    for (let i = 0; i < 5; i++) {
        if (wArr[i] === cArr[i]) {
            result[i] = 2;
            letterCount[cArr[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i] !== 2 && letterCount[cArr[i]] > 0) {
            result[i] = 1;
            letterCount[cArr[i]]--;
        }
    }
    console.log(result);

    res.json({ 
        hasWon: word === chosenAnswer,
        verdictArray: result 
    });
});

module.exports = router;