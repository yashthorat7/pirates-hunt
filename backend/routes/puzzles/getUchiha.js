const express = require('express');
const router = express.Router();
const gameData = require('../../data/gameData');

async function getPuzzleData(shipNo) {
    return {
        puzzleData: {
            message: "done"
        }
    };
}

async function checkWinCondition(shipNo, userInputs = []) {
    const shipIndex = parseInt(shipNo) - 11;
    if (!userInputs || !userInputs.length) {
        return { hasWon: false };
    }
    
    const guessedArray = userInputs[0];
    const correctSequence = gameData.clueLetters[shipIndex];
    
    if (!guessedArray || !correctSequence) {
        return { hasWon: false };
    }
    
    let isCorrect = true;
    for (let i = 0; i < 8; i++) {
        if (guessedArray[i] !== correctSequence[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        return { 
            hasWon: true,
            fileName: "https://ik.imagekit.io/gg83pklk8/cvhasui.png"
        };
    } else {
        return { hasWon: false };
    }
}

router.get('/getUchiha', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getUchihaWin', async (req, res) => {
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
