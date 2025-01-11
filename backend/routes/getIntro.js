const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');

router.get('/', (req, res) => {
    try {
        const { gameId } = req.query;
        
        if (!gameId) {
            return res.status(400).json({ error: 'Missing gameId parameter' });
        }

        const index = gameData.introId.indexOf(gameId);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Invalid gameId' });
        }

        const gameNo = index + 1;
        const gameName = gameData.gameName[index];
        const titleName = gameData.titleName[index];
        const messages = gameData.introMessages[gameNo];

        res.json({
            titleName,
            gameName,
            messages
        });
    } catch (error) {
        console.error('Error in getIntro:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
