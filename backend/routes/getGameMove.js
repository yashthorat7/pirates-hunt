const express = require('express');
const router = express.Router();
const { gameData } = require('../data/gameData');

router.post('/', async (req, res) => {
    try {
        const { gameId, shipNo } = req.body;
        
        if (!gameId || !shipNo) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const index = gameData.gameId.indexOf(gameId);
        if (index === -1) {
            return res.status(404).json({ error: 'Invalid gameId' });
        }

        const outroGameId = gameData.outroId[index];
        res.json({
            redirect: `../outro/outro.html?ship=${shipNo}&id=${outroGameId}`
        });
    } catch (error) {
        console.error('Error in getGameMove:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 