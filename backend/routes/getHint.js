const express = require('express');
const path = require('path');
const router = express.Router();
const { readShipData, writeShipData } = require('./db');
const { gameData } = require('../data/gameData');

const HINTTIME = 10;

function getTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

router.get('/getHint', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo, 10);
    const shipNo = parseInt(req.query.shipNo, 10);
    const gameId = gameData.gameId[gameNo - 1];
    const startTime = await readShipData('starttime', shipNo, gameNo);
    const currentTime = getTime();
    const timeDiffMinutes = (currentTime - startTime) / 60;
    
    if (timeDiffMinutes >= HINTTIME && startTime !== 0) {
        await writeShipData('Unlocked', shipNo, gameNo, 1);
        res.json({
            message: "Times Up! Here we have solved it for you",
            link: path.join(`../../outro/outro.html?ship=${shipNo}&id=${gameId}`)
        });
    } else {
        res.json({ message: "Hint is not yet available." });
    }
});

module.exports = router;