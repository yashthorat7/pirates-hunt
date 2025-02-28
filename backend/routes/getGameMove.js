const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const getHomeRouter = require('./puzzles/getHome');
const getHattoriRouter = require('./puzzles/getHattori');
const getParadiseRouter = require('./puzzles/getParadise');
const getGokuRouter = require('./puzzles/getGoku');
const getSaitamaRouter = require('./puzzles/getSaitama');
const getYagamiRouter = require('./puzzles/getYagami');
const getHoloRouter = require('./puzzles/getHolo');
router.get('/', async (req, res) => {
    const { gameId, shipNo, userInputs } = req.query;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const gameNo = index + 1;
    const outroId = gameData.outroId[index];

    const mockReq = { query: { shipNo, userInputs: userInputs || '[]' } };
    let result;

    switch(gameNo) {
        case 1:
            result = await new Promise(resolve => {
                getHomeRouter.stack
                    .find(layer => layer.route?.path === '/getHomeWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 2:
            result = await new Promise(resolve => {
                getHattoriRouter.stack
                    .find(layer => layer.route?.path === '/getHattoriWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 3:
            result = await new Promise(resolve => {
                getParadiseRouter.stack
                    .find(layer => layer.route?.path === '/getParadiseWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 4:
            result = await new Promise(resolve => {
                getGokuRouter.stack
                    .find(layer => layer.route?.path === '/getGokuWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 5:
            result = await new Promise(resolve => {
                getSaitamaRouter.stack
                    .find(layer => layer.route?.path === '/getSaitamaWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 6:
            result = await new Promise(resolve => {
                getYagamiRouter.stack
                    .find(layer => layer.route?.path === '/getYagamiWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 7:
            result = await new Promise(resolve => {
                getHoloRouter.stack
                    .find(layer => layer.route?.path === '/getHoloWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
    }

    res.json(result.hasWon ? {
        ...result,
        redirect: `../../outro/outro.html?ship=${shipNo}&id=${outroId}`
    } : result);
});

module.exports = router;