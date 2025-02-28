const express = require('express');
const router = express.Router();

const MAX_LIVES = 150;

router.get('/getHolo', async (req, res) => {
    const { shipNo } = req.query;
    const lives = MAX_LIVES;
    res.json({
        puzzleData: {
            lives
        }
    });
});

router.get('/getHoloWin', async (req, res) => {
    const { shipNo, userInputs } = req.query;
    const remainingCount = parseInt(userInputs) || 0;
    console.log(remainingCount);
    const hasWon = remainingCount == 0;
    
    res.json({ hasWon });
});

module.exports = router;