const express = require('express');
const router = express.Router();
const { writeShipData, readShipData } = require('./db');
const { gameData } = require('../data/gameDatabase');

function getTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

router.get('/begin', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    
    try {
        const beginTime = await readShipData('BeginTime', shipNo, gameNo);
        if (beginTime === 0) {
            await writeShipData('BeginTime', shipNo, gameNo, getTime());
        }

        const introMessages = gameData.introMessages[gameNo];
        const gameName = gameData.gameName[gameNo - 1];
        const titleName = gameData.titleName[gameNo - 1];

        res.json({
            messages: Array.isArray(introMessages) ? introMessages : [introMessages],
            gameName,
            titleName
        });
    } catch (error) {
        console.error('Error in begin phase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/start', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    
    try {
        await writeShipData('StartTime', shipNo, gameNo, getTime());

        const connectMessages = gameData.connectMessages[gameNo];
        const gameInitialData = await getGameInitialData(gameNo, shipNo);

        res.json({
            messages: Array.isArray(connectMessages) ? connectMessages : [connectMessages],
            gameData: gameInitialData
        });
    } catch (error) {
        console.error('Error in start phase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/end', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    
    try {
        const endTime = await readShipData('EndTime', shipNo, gameNo);
        if (endTime === 0) {
            await writeShipData('EndTime', shipNo, gameNo, getTime());
        }

        const outroMessage = gameData.outroMessages[gameNo];
        const [baseMark, clueLetter] = await readClue(shipNo, gameNo);
        const checkpointImageUrl = `https://ik.imagekit.io/kzx8uktwt/Checkpoint/checkpoint (${baseMark}).png`;

        res.json({
            message: outroMessage,
            checkpointImage: checkpointImageUrl,
            baseMark,
            clueLetter
        });
    } catch (error) {
        console.error('Error in end phase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function getGameInitialData(gameNo, shipNo) {
    switch (gameNo) {
        case 1:
            return {
                tiles: Array.from({ length: 24 }, (_, i) => 
                    `https://ik.imagekit.io/kzx8uktwt/Tiles/set${(shipNo-11)%4 + 1}/tile (${i + 1}).png`)
            };
        case 2:
            return {
                image: `https://ik.imagekit.io/kzx8uktwt/Image360/image360 (${(shipNo-11)%4 + 1}).webp`
            };
        case 6:
            return {
                words: gameData.wordGuess.pirateWords
            };
        default:
            return {};
    }
}

module.exports = router;
