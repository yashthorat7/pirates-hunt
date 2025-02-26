const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const getHomeRouter = require('./puzzles/getHome');

router.get('/', async (req, res) => {
    const { gameId, shipNo } = req.query;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const titleName = gameData.titleName[index];
    const gameNo = index + 1;
    const messages = gameData.connectMessages[gameNo];

    // Call getHome route handler properly
    const homeResponse = await new Promise((resolve) => {
        const mockReq = { query: { shipNo } };
        const mockRes = {
            json: (data) => resolve(data)
        };
        
        getHomeRouter.stack
            .find(layer => layer.route?.path === '/getHome')
            .route.stack[0].handle(mockReq, mockRes);
    });

    res.json({
        titleName,
        messages,
        ...homeResponse.puzzleData
    });
});

module.exports = router;