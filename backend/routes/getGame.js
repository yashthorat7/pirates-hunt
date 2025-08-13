const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const connectMessages = require('../data/messages');
const db = require('../controllers/db');

const puzzleModules = {
    1: '../controllers/getHome',
    2: '../controllers/getHattori',
    3: '../controllers/getParadise',
    4: '../controllers/getGoku',
    5: '../controllers/getSaitama',
    6: '../controllers/getYagami',
    7: '../controllers/getHolo',
    8: '../controllers/getTanjiro',
    9: '../controllers/getUchiha',
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