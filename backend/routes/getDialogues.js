const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/getIntroDialogues', (req, res) => {
    const { gameNo } = req.query;
    const filePath = path.resolve(__dirname, '../data/introMessages.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        const messages = JSON.parse(data);
        const introMessages = messages[gameNo];

        res.json(Array.isArray(introMessages) ? introMessages : [introMessages]);
    });
});

router.get('/getConnectDialogues', (req, res) => {
    const { gameNo } = req.query;
    const filePath = path.resolve(__dirname, '../data/connectMessages.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        const messages = JSON.parse(data);
        const connectMessages = messages[gameNo];

        res.json(Array.isArray(connectMessages) ? connectMessages : [connectMessages]);
    });
});

router.get('/getOutroDialogues', (req, res) => {
    const { gameNo } = req.query;
    const filePath = path.resolve(__dirname, '../data/outroMessages.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        const messages = JSON.parse(data);
        const outroMessage = messages[gameNo];
        res.json(outroMessage);
    });
});

module.exports = router;
