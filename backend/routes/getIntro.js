const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');

router.get('/', async (req, res) => {
    const { introId, shipNo } = req.query;
    const index = gameData.introId.findIndex(id => id === introId);
    const gameNo = (index + 1);
    const titleName = gameData.titleName[index];
    const messages = gameData.introMessages[gameNo];

    res.json({
        titleName, messages
    });
});

module.exports = router;
