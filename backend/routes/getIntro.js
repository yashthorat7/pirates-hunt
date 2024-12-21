const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const shipFilePath = path.resolve(__dirname, '../data/shipLogs.json');
const gameFilePath = path.resolve(__dirname, '../data/gameData.json');
const gameData = JSON.parse(fs.readFileSync(gameFilePath, 'utf8'));

const getLink = (gameNo, shipNo, gameName) => {
    const shipLogs = JSON.parse(fs.readFileSync(shipFilePath, 'utf8'));
    const fieldValues = shipLogs[`ship${shipNo}`].Unlocked.split(', ').map(Number);
    return fieldValues[gameNo] !== 0
        ? `../outro/outro.html?ship=${shipNo}&id=${gameData.gameId[gameNo]}`
        : `../puzzles/${gameName}/puzzle.html?ship=${shipNo}`;
};

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
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo);
    const gameName = req.query.gameName;
    const redirectLink = getLink(gameNo, shipNo, gameName);
    res.json({
        link: redirectLink
    });
});

module.exports = router;
