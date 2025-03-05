const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('./db');
const gameData = require('../data/gameData');

const HINTTIME = 1;

router.get('/getHint', async (req, res) => {
    const { gameId, shipNo } = req.query;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const gameNo = index + 1;
    const startTime = await db.readShipData('starttime', gameNo, shipNo);
    const outroId = gameData.outroId[index];
    const currentTime = db.getTime();
    const timeDiffMinutes = (currentTime - startTime) / 60;

    if (timeDiffMinutes >= HINTTIME && startTime !== 0) {
        await db.writeShipData('Unlocked', gameNo, shipNo, 2);
        res.json({
            message: "Times Up! Here we have solved it for you",
            redirect: `../../outro/outro.html?ship=${shipNo}&id=${outroId}`
        });
    }
});

module.exports = router;
    