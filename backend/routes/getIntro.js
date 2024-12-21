const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const gameFilePath = path.resolve(__dirname, '../data/gameData.json');
const data = fs.readFileSync(gameFilePath, 'utf8');
const gameData = JSON.parse(data);

router.get('/getGameData', (req, res) => {
    const Id = req.query.Id;
    const index = gameData.gameId.indexOf(Id);
    res.json({
        gameNo: index + 1,
        gameName: gameData.gameName[index],
        titleName: gameData.titleName[index]
    });
});

router.get('/getPuzzle', (req, res) => {
    const shipNo = parseInt(req.query.shipNo);
    const gameName = req.query.gameName;
    console.log('working');
    res.json({
        link: `../puzzles/${gameName}/puzzle.html?ship=${shipNo}`
    });
});

module.exports = router;
