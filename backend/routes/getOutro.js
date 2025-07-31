const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const outroMessage = require('../data/messages');
require('dotenv').config({ path: '.env.local' });


router.get('/', async (req, res) => {
    const { outroId, shipNo } = req.query;
    const gameIndex = gameData.outroId.findIndex(id => id === outroId);
    const gameNo = gameIndex + 1;
    const title = gameData.title[gameIndex];
    const message = outroMessage.outroMessages[gameNo];

    let attemptIndex;
    const shipIndex = parseInt(shipNo) - 11;

    let baseMark, clueLetter, clueImageName;

    if (gameIndex === 0) {
        attemptIndex = 0;
        baseMark = gameData.baseMarks[shipIndex][attemptIndex];
        clueLetter = gameData.clueLetters[shipIndex][attemptIndex];
        clueImageName = gameData.clueImageName[baseMark - 1];
        clueImageName = gameData.clueImageName[baseMark - 1];
    } else {
        attemptIndex = gameData.baseMarks[shipIndex].findIndex(mark => mark === gameIndex);
        baseMark = gameData.baseMarks[shipIndex][attemptIndex + 1];
        clueLetter = gameData.clueLetters[shipIndex][attemptIndex + 1];
        clueImageName = gameData.clueImageName[baseMark - 1];
    }

    res.json({
        title,
        message,
        baseMark,
        clueLetter,
        clueImageName
    });
});

module.exports = router;
