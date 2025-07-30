const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const db = require('./db');
const getHomeRouter = require('./puzzles/getHome');
const getHattoriRouter = require('./puzzles/getHattori');
const getParadiseRouter = require('./puzzles/getParadise');
const getGokuRouter = require('./puzzles/getGoku');
const getSaitamaRouter = require('./puzzles/getSaitama');
const getYagamiRouter = require('./puzzles/getYagami');
const getHoloRouter = require('./puzzles/getHolo');
const getTanjiroRouter = require('./puzzles/getTanjiro');
const getUchihaRouter = require('./puzzles/getUchiha');


const winFunctions = {
    checkHomeWin: require('./puzzles/getHome').checkWinCondition,
    checkHattoriWin: require('./puzzles/getHattori').checkWinCondition,
    checkParadiseWin: require('./puzzles/getParadise').checkWinCondition,
    checkGokuWin: require('./puzzles/getGoku').checkWinCondition,
    checkSaitamaWin: require('./puzzles/getSaitama').checkWinCondition,
    checkYagamiWin: require('./puzzles/getYagami').checkWinCondition,
    checkHoloWin: require('./puzzles/getHolo').checkWinCondition,
    checkTanjiroWin: require('./puzzles/getTanjiro').checkWinCondition,
    checkUchihaWin: require('./puzzles/getUchiha').checkWinCondition,
};

router.get('/', async (req, res) => {
    const { gameId, shipNo, userInputs } = req.query;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const gameNo = index + 1;
    const outroId = gameData.outroId[index];

    let parsedInputs = [];
    try {
        parsedInputs = userInputs ? JSON.parse(userInputs) : [];
    } catch (error) {
        console.error('Error parsing userInputs:', error);
    }

    let result;

    switch (gameNo) {
        case 1:
            result = await winFunctions.checkHomeWin(shipNo, parsedInputs);
            break;
        case 2:
            result = await winFunctions.checkHattoriWin(shipNo, parsedInputs);
            break;
        case 3:
            result = await winFunctions.checkParadiseWin(shipNo, parsedInputs);
            break;
        case 4:
            result = await winFunctions.checkGokuWin(shipNo, parsedInputs);
            break;
        case 5:
            result = await winFunctions.checkSaitamaWin(shipNo, parsedInputs);
            break;
        case 6:
            result = await winFunctions.checkYagamiWin(shipNo, parsedInputs);
            break;
        case 7:
            result = await winFunctions.checkHoloWin(shipNo, parsedInputs);
            break;
        case 8:
            result = await winFunctions.checkTanjiroWin(shipNo, parsedInputs);
            break;
        case 9:
            result = await winFunctions.checkUchihaWin(shipNo, parsedInputs);
            break;
    }

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