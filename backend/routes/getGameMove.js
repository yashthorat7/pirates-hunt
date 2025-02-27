const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const getHomeRouter = require('./puzzles/getHome');
const getHattoriRouter = require('./puzzles/getHattori');

router.get('/', async (req, res) => {
    const { gameId, shipNo, userInputs } = req.query;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const gameNo = index + 1;
    const outroId = gameData.outroId[index];

    const mockReq = { 
        query: { 
            shipNo, 
            userInputs: userInputs || '[]'
        } 
    };
    let hasWon = false;

    switch(gameNo) {
        case 1:
            hasWon = await new Promise(resolve => {
                getHomeRouter.stack
                    .find(layer => layer.route?.path === '/getHomeWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
        case 2:
            hasWon = await new Promise(resolve => {
                getHattoriRouter.stack
                    .find(layer => layer.route?.path === '/getHattoriWin')
                    .route.stack[0].handle(mockReq, { json: resolve });
            });
            break;
    }

    res.json(hasWon.hasWon ? {
        hasWon: true,
        redirect: `../../outro/outro.html?ship=${shipNo}&id=${outroId}`
    } : { hasWon: false });
});

module.exports = router; 