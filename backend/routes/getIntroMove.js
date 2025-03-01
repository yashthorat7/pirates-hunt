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
    console.log(gameNo, shipNo, isUnlocked);
    await db.writeShipData('begintime', gameNo, shipNo);
    const titleName = gameData.titleName[index];

    const canOpen = isUnlocked > 0;
    const redirectLink = canOpen 
        ? `../outro/outro.html?ship=${shipNo}&id=${outroId}`
        : `../puzzles/${titleName}/puzzle.html?ship=${shipNo}&id=${gameId}`;

    res.json({
        redirect: redirectLink
    });
});

module.exports = router; 