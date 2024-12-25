const express = require('express');
const router = express.Router();
const { writeShipData, readShipData } = require('./db'); 

function getTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

async function updateShipLogs(field, shipNo, gameNo) {
    const fieldValue = await readShipData(field, shipNo, gameNo);
    if (fieldValue === 0 || field === 'StartTime') {
        await writeShipData(field, shipNo, gameNo, getTime());
    }
}

router.get('/setBeginTime', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    await updateShipLogs('BeginTime', shipNo, gameNo);
    res.sendStatus(204);
});

router.get('/setStartTime', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    await updateShipLogs('StartTime', shipNo, gameNo);
    res.sendStatus(204);
});

router.get('/setEndTime', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    await updateShipLogs('EndTime', shipNo, gameNo, );
    res.sendStatus(204);
});

module.exports = router;
