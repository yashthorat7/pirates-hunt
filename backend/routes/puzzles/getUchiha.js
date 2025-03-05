const express = require('express');
const router = express.Router();
const gameData = require('../../data/gameData');

router.get('/getUchiha', async (req, res) => {
    res.json({
        puzzleData: {
            message: "done"
        }
    });
});

router.get('/getUchihaWin', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo);
    const userInputs = req.query.userInputs;
    const index = shipNo - 11;
    
    const correctSequence = gameData.clueLetters[index];
    const guessedArray = JSON.parse(userInputs);
    
    let isCorrect = true;
    for (let i = 0; i < 8; i++) {
        if (guessedArray[i] !== correctSequence[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        res.json({ 
            hasWon: true,
            fileName: "../../assets/uchiha/cvhasui.png"
        });
    } else {
        res.json({ hasWon: false });
    }
});

module.exports = router;
