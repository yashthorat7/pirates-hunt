const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const HINTTIME = 1;
const shipLogsPath = path.resolve(__dirname, '../data/shipLogs.json');

function getTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

router.get('/getHint', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo);

    const fileData = fs.readFileSync(shipLogsPath, 'utf8');
    const shipLogs = JSON.parse(fileData);
    const shipId = `ship${shipNo}`;
    const startTime = shipLogs[shipId]?.StartTime?.[gameNo] || -1;

    const timeDiffMinutes = (getTime() - startTime) / 60;
    console.log(startTime, timeDiffMinutes);

    if (timeDiffMinutes >= HINTTIME) {
        res.json({
            message: "Times Up! Here we have solved it for you",
            link: `../../outro/outro.html?ship=${shipNo}`
        });
    }
});

module.exports = router;
