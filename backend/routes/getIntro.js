const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const introMessages = require('../data/messages');

router.get('/', async (req, res) => {
    const { introId, shipNo } = req.query;
    const index = gameData.introId.findIndex(id => id === introId);
    const gameNo = (index + 1);
    const titleName = gameData.titleName[index];
    const messages = introMessages.introMessages[gameNo];

    res.json({
        titleName, messages
    });
});

module.exports = router;
