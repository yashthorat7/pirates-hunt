const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const outroMessage = require('../data/messages');
const ImageKit = require("imagekit");
require('dotenv').config({ path: '.env.local' });

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

router.get('/', async (req, res) => {
    const { outroId, shipNo } = req.query;
    const index = gameData.outroId.findIndex(id => id === outroId);
    const gameNo = index + 1;
    const titleName = gameData.titleName[index];
    const message = outroMessage.outroMessages[gameNo];

    const shipIndex = parseInt(shipNo) - 11;
    const baseMark = gameData.baseMarks[shipIndex][index];
    const clueLetter = gameData.clueLetters[shipIndex][index];
    const clueImageName = gameData.clueImageName[baseMark - 1];
    const fileUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}${clueImageName}.png`;

    res.json({
        titleName, 
        message, 
        baseMark, 
        clueLetter, 
        fileUrl
    });
});

module.exports = router;
