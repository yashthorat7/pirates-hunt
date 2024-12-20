const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const timeFlags = Array.from({ length: 40 }, () => 
    Array.from({ length: 10 }, () => Array(3).fill(0) )
);

function getTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    console.log((hours * 3600) + (minutes * 60) + seconds);
    return (hours * 3600) + (minutes * 60) + seconds;
}

router.get('/setBeginTime', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;
    timeFlags[shipNo][gameNo][0] = getTime();
    res.sendStatus(204);
});

router.get('/setStartTime', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;
    timeFlags[shipNo][gameNo][1]= getTime();
    res.sendStatus(204);
});

router.get('/setEndTime', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;
    timeFlags[shipNo][gameNo][2] = getTime();
    res.sendStatus(204);
});

module.exports = router;