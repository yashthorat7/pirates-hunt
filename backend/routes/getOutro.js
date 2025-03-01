const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const db = require('./db');

router.get('/', async (req, res) => {
    const { outroId, shipNo } = req.query;
    const index = gameData.outroId.findIndex(id => id === outroId);
    const gameNo = index + 1;
    const titleName = gameData.titleName[index];
    const message = gameData.outroMessages[gameNo];

    await db.setEndTime(gameNo, shipNo);

    const shipIndex = parseInt(shipNo) - 11;
    const baseMark = gameData.baseMarks[shipIndex][index];
    const clueLetter = gameData.clueLetters[shipIndex][index];
    const clueImageName = gameData.clueImageName[baseMark - 1];

    console.log(titleName, baseMark, clueLetter, message, clueImageName);

    res.json({
        titleName,  baseMark, clueLetter, message, clueImageName
    });
});

module.exports = router; 