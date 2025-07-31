const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const connectMessages = require('../data/messages');
const db = require('./db');

const puzzleModules = {
    1: './puzzles/getHome',
    2: './puzzles/getHattori',
    3: './puzzles/getParadise',
    4: './puzzles/getGoku',
    5: './puzzles/getSaitama',
    6: './puzzles/getYagami',
    7: './puzzles/getHolo',
    8: './puzzles/getTanjiro',
    9: './puzzles/getUchiha',
};

router.get('/', async (req, res) => {
    const { gameId, shipNo } = req.query;
    const shipIndex = parseInt(shipNo) - 11;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const gameNo = index + 1;
    const title = gameData.title[index];
    const messages = connectMessages.connectMessages[gameNo];

    const { getGame } = require(puzzleModules[gameNo]);
    let data = await getGame(shipIndex);

    await db.writeShipData('starttime', gameNo, shipNo);

    res.json({
        title,
        messages,
        ...data
    });
});

module.exports = router;