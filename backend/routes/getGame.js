const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { gameId, shipNo } = req.body;
        
        if (!gameId || !shipNo) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        res.json({
            gameName: 'Game Name',
            setNo: 1,
            gameData: {} // temp
        });
    } catch (error) {
        console.error('Error in getGame:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 