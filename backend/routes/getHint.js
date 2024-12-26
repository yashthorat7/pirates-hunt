const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const router = express.Router();
const { readShipData, writeShipData } = require('./db');

const HINTTIME = 0.5;

function getTime() {
    return Math.floor(new Date().getTime() / 1000);
}

async function getGameData() {
    const data = await fs.readFile('../data/gameData.json', 'utf8');
    return JSON.parse(data);
}

router.get('/getHint', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo, 10);
    const shipNo = parseInt(req.query.shipNo, 10);
    const gameData = await getGameData();
    const gameId = gameData.gameId[gameNo - 1];
    const startTime = await readShipData('starttime', shipNo, gameNo);
    const currentTime = getTime();
    const timeDiffMinutes = (currentTime - startTime) / 60;

    if (timeDiffMinutes >= HINTTIME) {
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