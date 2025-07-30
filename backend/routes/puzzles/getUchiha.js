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

async function checkWinCondition(shipNo, guessedArray) {
    const shipIndex = Number(shipNo) - 11;
    const correctSequence = gameData.clueLetters[shipIndex];

    guessedArray = guessedArray.map(String).slice(0, 8);

    let isWin = true;
    for (let i = 0; i < 8; i++) {
        if (guessedArray[i] !== correctSequence[i]) {
            isWin = false;
            break;
        }
    }

    return isWin
        ? { hasWon: true, fileName: "../../assets/uchiha/cvhasui.png" }
        : { hasWon: false };
}


router.get('/getUchiha', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getUchihaWin', async (req, res) => {
    const { shipNo, userInputs } = req.query;
    let guessedArray = Array.isArray(userInputs)
        ? userInputs
        : JSON.parse(userInputs || '[]');


    const result = await checkWinCondition(shipNo, guessedArray);
    res.json(result);
});

module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;
