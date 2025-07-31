const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const introMessages = require('../data/messages');

router.get('/', async (req, res) => {
    const { introId } = req.query;
    const index = gameData.introId.findIndex(id => id === introId);
    const gameNo = (index + 1);
    const title = gameData.title[index];
    const messages = introMessages.introMessages[gameNo];

    res.json({
        title,
        messages
    });
});

module.exports = router;
