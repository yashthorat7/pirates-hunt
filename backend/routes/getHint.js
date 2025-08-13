const express = require('express');
const router = express.Router();
const db = require('../controllers/db');
const gameData = require('../data/gameData');

const HINTTIME = 10;
const StartTimeCache = new Array(40).fill(null);

router.get('/getHint', async (req, res) => {
    const { gameId, shipNo } = req.query;
    const gameIndex = gameData.gameId.findIndex(id => id === gameId);
    const gameNo = gameIndex + 1;

    const outroId = gameData.outroId[gameIndex];

    const shipIndex = parseInt(shipNo, 10) - 11;
    if (StartTimeCache[shipIndex] === null || StartTimeCache[shipIndex] === 0) {
        const dbstartTime = await db.readShipData('starttime', gameNo, shipNo);
        StartTimeCache[shipIndex] = dbstartTime || 0;
    }

    const startTime = StartTimeCache[shipIndex];
    const currentTime = db.getTime();
    const timeDiffMinutes = (currentTime - startTime) / 60;
    if (timeDiffMinutes >= HINTTIME && startTime !== 0) {
        await db.writeShipData('endtime', gameNo, shipNo);
        await db.writeShipData('unlocked', gameNo, shipNo, 2);

        res.json({
            message: "Times Up! Here, I have solved it for you",
            redirect: `../../outro/outro.html?ship=${shipNo}&id=${outroId}`
        });
    }
});

module.exports = router;
