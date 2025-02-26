const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const getHomeRouter = require('./puzzles/getHome');
const getHattoriRouter = require('./puzzles/getHattori');

router.get('/', async (req, res) => {
    const { gameId, shipNo } = req.query;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const titleName = gameData.titleName[index];
    const gameNo = index + 1;
    const messages = gameData.connectMessages[gameNo];

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
    }

    res.json({
        titleName,
        messages,
        ...puzzleData.puzzleData
    });
});

module.exports = router;