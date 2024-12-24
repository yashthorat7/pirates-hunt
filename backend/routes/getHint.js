const express = require('express');
const router = express.Router();
const fs = require('fs');

const HINTTIME = 2;
const { readShipData, writeShipData } = require('./db'); 

function getTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

router.get('/getHint', (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);

    const startTime = readShipData('starttime', shipNo, gameNo);
    const timeDiffMinutes = (getTime() - startTime) / 60;

    if (timeDiffMinutes >= HINTTIME) {
        res.json({
            message: "Times Up! Here we have solved it for you",
            link: `../../outro/outro.html?ship=${shipNo}&id=${gameId}`
        });
        writeShipData('unlocked', shipNo, gameNo, 1);
    }
});

module.exports = router;
