const express = require('express');
const router = express.Router();

const MAX_LIVES = 150;

async function getPuzzleData(shipNo) {
    const lives = MAX_LIVES;
    return {
        lives
    };
}

async function checkWinCondition(shipNo, userInputs = []) {
    const remainingCount = Array.isArray(userInputs) && userInputs.length > 0
        ? parseInt(userInputs[0]) || 0
        : 0;
    const hasWon = remainingCount == 0;

    return { hasWon };
}

router.get('/getHolo', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getHoloWin', async (req, res) => {
    const { shipNo, userInputs } = req.query;
    let parsedInputs = [];
    try {
        parsedInputs = [userInputs];
    } catch {
    }
    const result = await checkWinCondition(shipNo, parsedInputs);
    res.json(result);
});

module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;