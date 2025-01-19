const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');

router.get('/', (req, res) => {
    try {
        const { gameId } = req.query;

        if (!gameId) {
            return res.status(400).json({ error: 'Missing gameId parameter' });
        }

        const index = gameData.introId.findIndex(id => id === gameId);

        if (index === -1) {
            return res.status(404).json({ error: 'Invalid gameId' });
        }

        const gameNo = (index + 1).toString();
        const titleName = gameData.titleName[index];
        const messages = gameData.introMessages[gameNo];

        if (!messages) {
            return res.status(500).json({ error: 'Messages not found for the given gameId' });
        }

        res.json({
            titleName,
            messages
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
