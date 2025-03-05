const express = require('express');
const router = express.Router();

const counts = [
    [2, 1, 11, 4],
    [3, 1, 16, 7],
    [1, 1, 12, 2],
    [0, 1, 19, 6]
];
imageName = ['(1)lsdja', '(2)menkj', '(3)wenvi', '(4)xqztr'];

router.get('/getHattori', async (req, res) => {
    const { shipNo } = req.query;
    const countNo = ((parseInt(shipNo) - 11) % 4);
    const image = imageName[countNo];

    res.json({
        puzzleData: {
            image
        }
    });
});

router.get('/getHattoriWin', async (req, res) => {
    const { shipNo, userInputs } = req.query;
    const setNo = (parseInt(shipNo, 10) - 11) % 4;
    const correctCount = counts[setNo];
    
    try {
        const parsedInputs = JSON.parse(userInputs);
        const inputs = Array.isArray(parsedInputs) ? parsedInputs.map(Number) : [];
        const hasWon = correctCount.every((v, i) => v === inputs[i]);
        res.json({ hasWon });
    } catch {
        res.json({ hasWon: false });
    }
});

module.exports = router;