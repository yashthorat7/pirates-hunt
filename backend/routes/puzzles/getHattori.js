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
    const { shipNo } = req.query;
    const userInputs = JSON.parse(req.query.userInputs);
    const setNo = ((parseInt(shipNo) - 11) % 4);
    const correctCount = counts[setNo];
    
    const hasWon = correctCount.every((value, index) => value === userInputs[index]);
    
    res.json({ hasWon });
});

module.exports = router;