const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const connectMessages = require('../data/messages');
const getHomeRouter = require('./puzzles/getHome');
const getHattoriRouter = require('./puzzles/getHattori');
const getParadiseRouter = require('./puzzles/getParadise');
const getGokuRouter = require('./puzzles/getGoku');
const getSaitamaRouter = require('./puzzles/getSaitama');
const getYagamiRouter = require('./puzzles/getYagami');
const getHoloRouter = require('./puzzles/getHolo');
const getTanjiroRouter = require('./puzzles/getTanjiro');
const getUchihaRouter = require('./puzzles/getUchiha');
const db = require('./db');

const puzzleFunctions = {
    getHome: require('./puzzles/getHome').getPuzzleData,
    getHattori: require('./puzzles/getHattori').getPuzzleData,
    getParadise: require('./puzzles/getParadise').getPuzzleData,
    getGoku: require('./puzzles/getGoku').getPuzzleData,
    getSaitama: require('./puzzles/getSaitama').getPuzzleData,
    getYagami: require('./puzzles/getYagami').getPuzzleData,
    getHolo: require('./puzzles/getHolo').getPuzzleData,
    getTanjiro: require('./puzzles/getTanjiro').getPuzzleData,
    getUchiha: require('./puzzles/getUchiha').getPuzzleData,
};

router.get('/', async (req, res) => {
    const { gameId, shipNo } = req.query;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const titleName = gameData.titleName[index];
    const gameNo = index + 1;
    const messages = connectMessages.connectMessages[gameNo];
    
    let puzzleData;

    switch(gameNo) {
        case 1:
            puzzleData = await puzzleFunctions.getHome(shipNo);
            break;
        case 2:
            puzzleData = await puzzleFunctions.getHattori(shipNo);
            break;
        case 3:
            puzzleData = await puzzleFunctions.getParadise(shipNo);
            break;
        case 4:
            puzzleData = await puzzleFunctions.getGoku(shipNo);
            break;
        case 5:
            puzzleData = await puzzleFunctions.getSaitama(shipNo);
            break;
        case 6:
            puzzleData = await puzzleFunctions.getYagami(shipNo);
            break;
        case 7:
            puzzleData = await puzzleFunctions.getHolo(shipNo);
            break;
        case 8:
            puzzleData = await puzzleFunctions.getTanjiro(shipNo);
            break;
        case 9:
            puzzleData = await puzzleFunctions.getUchiha(shipNo);
            break;
    }

    await db.writeShipData('starttime', gameNo, shipNo);

    res.json({
        titleName,
        messages,
        ...puzzleData.puzzleData
    });
});

module.exports = router;