const express = require('express');
const router = express.Router();

const setName = ["(1)fdjks", "(2)zpxqy", "(3)nbvtu", "(4)hclwo"];

async function getPuzzleData(shipNo) {
    const setNo = ((parseInt(shipNo) - 11) % 4);
    const fileName = setName[setNo];

    return {
        puzzleData: {
            fileName: fileName
        }
    };
}

async function checkWinCondition(shipNo, userInputs = []) {
    return {
        hasWon: true
    };
}

router.get('/getYagami', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getYagamiWin', async (req, res) => {
    const { shipNo } = req.query;
    const result = await checkWinCondition(shipNo);
    res.json(result);
});

module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;