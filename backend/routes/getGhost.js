const express = require('express');
const router = express.Router();
const gameNo = 8;

const { writeShipData } = require('./db'); 

router.get('/getGhostWin', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo);
    const clickCounter = parseInt(req.query.clickCounter);
    const maxLives = 100;
    const progressPercentage = (clickCounter / maxLives) * 100;
    if (progressPercentage >= 100) {
        await writeShipData('Unlocked', shipNo, gameNo, 1);
        await writeShipData('Solved', shipNo, gameNo, 1);
    }
    res.json(progressPercentage);
});

module.exports = router