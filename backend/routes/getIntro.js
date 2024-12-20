const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const gameList = ['1-jigsaw', '2-count360'];
const startTime = Date.now();
const HINTTIME = 30;

router.get('/getPuzzle', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo);
    const gameName = gameList[gameNo];
    res.json({
        link: `../puzzles/${gameName}/puzzle.html?ship=${shipNo}`
    });
});

module.exports = router;