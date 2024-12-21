const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const shipLogsPath = path.resolve(__dirname, '../data/shipLogs.json');

function getTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

function updateShipLogs(shipNo, gameNo, field) {
    const shipId = `ship${shipNo}`;
    const fileData = fs.readFileSync(shipLogsPath, 'utf8');
    const shipLogs = JSON.parse(fileData);

    let fieldValues = shipLogs[shipId][field].split(', ').map(Number);

    if (fieldValues[gameNo] === 0) {
        fieldValues[gameNo] = getTime();
        shipLogs[shipId][field] = fieldValues.join(', ');
        fs.writeFileSync(shipLogsPath, JSON.stringify(shipLogs, null, 2), 'utf8');
    }
}

router.post('/setBeginTime', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo);
    updateShipLogs(shipNo, gameNo, 'BeginTime');
    res.sendStatus(204);
});

router.post('/setStartTime', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo);
    updateShipLogs(shipNo, gameNo, 'StartTime');
    res.sendStatus(204);
});

router.post('/setEndTime', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo);
    updateShipLogs(shipNo, gameNo, 'EndTime');
    res.sendStatus(204);
});

module.exports = router;
