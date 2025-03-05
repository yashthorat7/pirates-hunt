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

router.get('/', async (req, res) => {
    const { gameId, shipNo } = req.query;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const titleName = gameData.titleName[index];
    const gameNo = index + 1;
    const messages = connectMessages.connectMessages[gameNo];

    await db.writeShipData('starttime', gameNo, shipNo);
    
    const mockReq = { query: { shipNo } };
    let puzzleData;

    switch(gameNo) {
        case 1:
            puzzleData = await new Promise(resolve => {
                getHomeRouter.stack
                    .find(layer => layer.route?.path === '/getHome')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 2:
            puzzleData = await new Promise(resolve => {
                getHattoriRouter.stack
                    .find(layer => layer.route?.path === '/getHattori')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 3:
            puzzleData = await new Promise(resolve => {
                getParadiseRouter.stack
                    .find(layer => layer.route?.path === '/getParadise')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 4:
            puzzleData = await new Promise(resolve => {
                getGokuRouter.stack
                    .find(layer => layer.route?.path === '/getGoku')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 5:
            puzzleData = await new Promise(resolve => {
                getSaitamaRouter.stack
                    .find(layer => layer.route?.path === '/getSaitama')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 6:
            puzzleData = await new Promise(resolve => {
                getYagamiRouter.stack
                    .find(layer => layer.route?.path === '/getYagami')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 7:
            puzzleData = await new Promise(resolve => {
                getHoloRouter.stack
                    .find(layer => layer.route?.path === '/getHolo')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 8:
            puzzleData = await new Promise(resolve => {
                getTanjiroRouter.stack
                    .find(layer => layer.route?.path === '/getTanjiro')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 9:
            puzzleData = await new Promise(resolve => {
                getUchihaRouter.stack
                    .find(layer => layer.route?.path === '/getUchiha')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
    }

    res.json({
        titleName,
        messages,
        ...puzzleData.puzzleData
    });
});

module.exports = router;