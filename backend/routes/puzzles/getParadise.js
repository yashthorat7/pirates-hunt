const express = require('express');
const router = express.Router();

const mazeName = ["(1)fsldk", "(2)gbnwe", "(3)omhfg", "(4)bnewl"];


async function getPuzzleData(shipNo) {
    const mazeNo = ((parseInt(shipNo) - 11) % 4);
    const fileName = mazeName[mazeNo];

    return {
        fileName: fileName
    };
}

async function checkWinCondition(shipNo, userInputs = ["hi"]) {
    return {
        hasWon: true
    };
}

router.get('/getParadise', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getParadiseWin', async (req, res) => {
    const { shipNo } = req.query;
    const result = await checkWinCondition(shipNo);
    res.json(result);
});

module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;