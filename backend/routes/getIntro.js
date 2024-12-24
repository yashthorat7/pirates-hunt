const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const gameFilePath = path.resolve(__dirname, '../data/gameData.json');
const gameData = JSON.parse(fs.readFileSync(gameFilePath, 'utf8'));
const { readShipData } = require('./db'); 

const getLink = async (gameNo, shipNo, gameName) => {
    const fieldValue = await readShipData('unlocked', shipNo, gameNo);
    console.log('fetched:', fieldValue);
    return fieldValue > 0
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

router.get('/getPuzzle', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    const gameName = req.query.gameName;
    const redirectLink = await getLink(gameNo, shipNo, gameName);
    res.json({
        link: redirectLink
    });
});

module.exports = router;
