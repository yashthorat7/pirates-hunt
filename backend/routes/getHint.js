const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const HINTTIME = 10;
const shipLogsPath = path.resolve(__dirname, '../data/shipLogs.json');
const gameDataPath = path.resolve(__dirname, '../data/gameData.json');

function getTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

router.get('/getHint', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo);

    const gameData = fs.readFileSync(gameDataPath, 'utf8');
    const shipLogsData = fs.readFileSync(shipLogsPath, 'utf8');
    const shipLogs = JSON.parse(shipLogsData);
    const gameDataJson = JSON.parse(gameData);

    const gameId = gameDataJson.gameId[gameNo];
    const shipId = `ship${shipNo}`;
    const startTimeString = shipLogs[shipId]?.StartTime;
    const startTimeArray = startTimeString.split(',').map(num => parseInt(num.trim(), 10));
    const startTime = startTimeArray[gameNo];

    const timeDiffMinutes = (getTime() - startTime) / 60;

    if (timeDiffMinutes >= HINTTIME) {
        res.json({
            message: "Times Up! Here we have solved it for you",
            link: `../../outro/outro.html?ship=${shipNo}&id=${gameId}`
        });
        shipLogs[`ship${shipNo}`].Unlocked.split(', ').map(Number)[gameNo] = 1;
        fs.writeFileSync(shipLogsPath, JSON.stringify(shipLogs, null, 2));
    }
});

module.exports = router;
