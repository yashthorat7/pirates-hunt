const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const db = require('../controllers/db');

router.get('/', async (req, res) => {
    const { introId, shipNo } = req.query;
    const introIndex = gameData.introId.findIndex(id => id === introId);
    const gameId = gameData.gameId[introIndex];
    const gameNo = introIndex + 1;
    const outroId = gameData.outroId[introIndex];

    let isUnlocked;
    try {
        isUnlocked = await db.readShipData("unlocked", gameNo, shipNo);
    } catch (error) {
        isUnlocked = 0;
    }
    await db.writeShipData('begintime', gameNo, shipNo);
    const title = gameData.title[introIndex];

    const canOpen = isUnlocked > 0;
    const redirectLink = canOpen
        ? `../outro/outro.html?ship=${shipNo}&id=${outroId}`
        : `../puzzles/${title}/puzzle.html?ship=${shipNo}&id=${gameId}`;

    res.json({
        redirect: redirectLink
    });
});

module.exports = router; 