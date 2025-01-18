const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');

router.get('/', (req, res) => {
    try {
        const { gameId, shipNo } = req.query;
        
        if (!gameId || !shipNo) {
            return res.status(400).json({ error: 'Missing gameId or shipNo parameter' });
        }

        const index = gameData.outroId.indexOf(gameId);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Invalid gameId' });
        }

        const gameNo = index + 1;
        const titleName = gameData.titleName[index];
        const titleName = gameData.titleName[index];
        const message = gameData.outroMessages[gameNo];
        
        const shipIndex = parseInt(shipNo) - 1;
        const baseMark = gameData.baseMarks[shipIndex][gameNo - 1];
        const clueLetter = gameData.clueLetters[shipIndex][gameNo - 1];
        const clueImageName = gameData.clueImageName[baseMark - 1];

        res.json({
            titleName,
            titleName,
            baseMark,
            clueLetter,
            message,
            clueImageName
        });
    } catch (error) {
        console.error('Error in getOutro:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 