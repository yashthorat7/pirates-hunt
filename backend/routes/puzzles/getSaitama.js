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
    return null;
}

async function checkWinCondition(shipNo, userInputs) {
    let inputs = [];
    if (typeof userInputs === 'string') {
        try {
            const parsed = JSON.parse(userInputs);
            if (Array.isArray(parsed)) {
                inputs = parsed;
            } else if (typeof parsed === 'string') {
                inputs = [parsed];
            } else {
                inputs = [];
            }
        } catch {
            inputs = [userInputs];
        }
    } else if (Array.isArray(userInputs)) {
        inputs = userInputs;
    }

    const rawGuess = (inputs[0] || '').toUpperCase();
    if (!rawGuess) {
        return { hasWon: false };
    }

    const cArr = rawGuess.split('');
    const shipIndex = parseInt(shipNo, 10) - 11;
    const word = (assignedWord[shipIndex] || '').toUpperCase();
    const wArr = word.split('');

    const letterCount = {};
    wArr.forEach(c => {
        letterCount[c] = (letterCount[c] || 0) + 1;
    });

    const result = Array(5).fill(0);

    for (let i = 0; i < 5; i++) {
        if (wArr[i] === cArr[i]) {
            result[i] = 2;
            letterCount[cArr[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i] === 0 && letterCount[cArr[i]] > 0) {
            result[i] = 1;
            letterCount[cArr[i]]--;
        }
    }

    return {
        hasWon: word === rawGuess,
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
    let parsedInputs = JSON.parse(userInputs || '[]');
    const result = await checkWinCondition(shipNo, parsedInputs);
    res.json(result);
});

module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;