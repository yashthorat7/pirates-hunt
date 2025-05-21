const express = require('express');
const router = express.Router();

const pirateWords = [
    "SHARK", "SWORD", "STORY", "COUNT",
    "CHEST", "SKULL", "BLACK", "WHITE",
    "STORM", "CORAL", "MUSIC", "DANCE",
    "SOUND", "RUMOR", "SLEEP", "SCORE"
];

const assignedWord = new Array(40).fill(null);


async function getPuzzleData(shipNo) {
    const shipIndex = parseInt(shipNo) - 11;
    const randomIndex = Math.floor(Math.random() * pirateWords.length);
    const word = pirateWords[randomIndex];
    assignedWord[shipIndex] = word;

    return {
        puzzleData: {
            word
        }
    };
}

async function checkWinCondition(shipNo, userInputs = []) {
    const shipIndex = parseInt(shipNo) - 11;
    const chosenAnswer = Array.isArray(userInputs) && userInputs.length > 0 
        ? userInputs[0]?.toUpperCase() 
        : "";
    const word = assignedWord[shipIndex]?.toUpperCase();

    if (!word || !chosenAnswer) {
        return { hasWon: false };
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

    return { 
        hasWon: word === chosenAnswer,
        verdictArray: result 
    };
}


router.get('/getSaitama', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getSaitamaWin', async (req, res) => {
    const { shipNo, userInputs } = req.query;
    let parsedInputs = [];
    try {
        parsedInputs = [JSON.parse(userInputs)];
    } catch {
        
    }
    const result = await checkWinCondition(shipNo, parsedInputs);
    res.json(result);
});

module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;