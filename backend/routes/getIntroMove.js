const express = require('express');
const router = express.Router();
const { gameData } = require('../data/gameDatabase');
const { getGameProgress } = require('./db');

router.get('/', async (req, res) => {
    try {
        const { gameId, shipNo } = req.query;
        
        if (!gameId || !shipNo) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const index = gameData.introId.indexOf(gameId);
        if (index === -1) {
            return res.status(404).json({ error: 'Invalid gameId' });
        }
        const gameNo = index + 1;

        const puzzleGameId = gameData.gameId[index];

        const progress = await getGameProgress(gameId, parseInt(shipNo));
        const isUnlocked = progress?.unlocked || 0;

        const gameName = gameData.gameName[index];
        const redirectLink = isUnlocked 
            ? `../outro/outro.html?ship=${shipNo}&id=${puzzleGameId}`
            : `../puzzles/${gameName}/puzzle.html?ship=${shipNo}&id=${puzzleGameId}`;

        res.json({
            redirect: redirectLink
        });
    } catch (error) {
        console.error('Error in getIntroMove:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 