const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const db = require('./db');

const winModules = {
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
    const { gameId, shipNo, userInputs } = req.query;
    const shipIndex = parseInt(shipNo) - 11;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const gameNo = index + 1;
    const outroId = gameData.outroId[index];

    let parsedInputs;
    try {
        parsedInputs = JSON.parse(userInputs);
    } catch (error) {
        console.error('Error parsing userInputs:', error);
    }

    const { getGameWin } = require(winModules[gameNo]);
    let result = parsedInputs.length !== 0 ? await getGameWin(shipIndex, parsedInputs) : await getGameWin(shipIndex);

    if (result.hasWon) {
        await db.writeShipData('endtime', gameNo, shipNo);
        await db.writeShipData('unlocked', gameNo, shipNo, 1);
    }

    res.json(result.hasWon ? {
        ...result,
        redirect: `../../outro/outro.html?ship=${shipNo}&id=${outroId}`
    } : result);
});

module.exports = router;