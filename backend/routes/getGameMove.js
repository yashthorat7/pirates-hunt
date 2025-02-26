const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');

router.post('/', async (req, res) => {
    const { gameId, shipNo } = req.body;
    const index = gameData.gameId.findIndex(id => id === gameId);
    const outroId = gameData.outroId[index];
    
    res.json({
        redirect: `../../outro/outro.html?ship=${shipNo}&id=${outroId}`
    });
});

module.exports = router; 