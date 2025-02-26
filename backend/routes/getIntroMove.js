const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
// const { getGameProgress } = require('./db');

router.get('/', async (req, res) => {
    const { introId, shipNo } = req.query;
    const index = gameData.introId.indexOf(introId);
    const gameId = gameData.gameId[index];
    const outroId = gameData.outroId[index];
    // const progress = await getGameProgress(gameId, parseInt(shipNo));
    // const isUnlocked = progress?.unlocked || 0;
    const isUnlocked = 0;

    const titleName = gameData.titleName[index];
    const redirectLink = isUnlocked 
        ? `../outro/outro.html?ship=${shipNo}&id=${outroId}`
        : `../puzzles/${titleName}/puzzle.html?ship=${shipNo}&id=${gameId}`;

    res.json({
        redirect: redirectLink
    });
});

module.exports = router; 