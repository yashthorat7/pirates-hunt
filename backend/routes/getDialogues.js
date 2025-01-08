const express = require('express');
const router = express.Router();
const { gameData } = require('../data/gameDatabase');

router.get('/getIntroDialogues', (req, res) => {
    const { gameNo } = req.query;
    const introMessages = gameData.introMessages[gameNo];
    res.json(Array.isArray(introMessages) ? introMessages : [introMessages]);
});

router.get('/getConnectDialogues', (req, res) => {
    const { gameNo } = req.query;
    const connectMessages = gameData.connectMessages[gameNo];
    res.json(Array.isArray(connectMessages) ? connectMessages : [connectMessages]);
});

router.get('/getOutroDialogues', (req, res) => {
    const { gameNo } = req.query;
    const outroMessage = gameData.outroMessages[gameNo];
    res.json(outroMessage);
});

module.exports = router;
