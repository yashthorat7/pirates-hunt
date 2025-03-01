const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const db = require('./db');

router.get('/', async (req, res) => {
    const { introId, shipNo } = req.query;
    const index = gameData.introId.findIndex(id => id === introId);
    const gameId = gameData.gameId[index];
    const gameNo = index + 1;
    const outroId = gameData.outroId[index];
    let isUnlocked = 0;
    try {
        isUnlocked = await db.getUnlocked(gameNo, shipNo);
    } catch (error) {
        isUnlocked = 0;
    }
    await db.setBeginTime(gameNo, shipNo);
    const titleName = gameData.titleName[index];
    console.log(isUnlocked);
    const redirectLink = isUnlocked 
        ? `../outro/outro.html?ship=${shipNo}&id=${outroId}`
        : `../puzzles/${titleName}/puzzle.html?ship=${shipNo}&id=${gameId}`;

    res.json({
        redirect: redirectLink
    });
});

module.exports = router; 