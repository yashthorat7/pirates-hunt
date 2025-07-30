const express = require('express');
const router = express.Router();

const counts = [
    [7, 2, 7, 4],
    [7, 3, 5, 2],
    [6, 1, 5, 5],
    [7, 2, 6, 3]
];
imageName = ['(1)lsdja', '(2)menkj', '(3)wenvi', '(4)xqztr'];


async function getPuzzleData(shipNo) {
    const countNo = ((parseInt(shipNo) - 11) % 4);
    const image = imageName[countNo];

    return {
        image
    };
}


async function checkWinCondition(shipNo, userInputs = []) {
    const setNo = (parseInt(shipNo, 10) - 11) % 4;
    const correctCount = counts[setNo];

    try {
        const inputs = Array.isArray(userInputs) ? userInputs.map(Number) : [];
        const hasWon = correctCount.every((v, i) => v === inputs[i]);
        return { hasWon };
    } catch {
        return { hasWon: false };
    }
}


router.get('/getHattori', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getHattoriWin', async (req, res) => {
    const { shipNo, userInputs } = req.query;
    let parsedInputs = [];
    try {
        parsedInputs = JSON.parse(userInputs || '[]');
    } catch {

    }
    const result = await checkWinCondition(shipNo, parsedInputs);
    res.json(result);
});


module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;