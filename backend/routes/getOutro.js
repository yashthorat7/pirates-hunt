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
    const gameIndex = gameData.outroId.findIndex(id => id === outroId);
    const gameNo = gameIndex + 1;
    const titleName = gameData.titleName[gameIndex];
    const message = outroMessage.outroMessages[gameNo];

    let attemptIndex;
    const shipIndex = parseInt(shipNo) - 11;

    let baseMark, clueLetter, clueImageName;

    if (gameIndex === 0) {
        attemptIndex = 0;
        baseMark = gameData.baseMarks[shipIndex][attemptIndex];
        clueLetter = gameData.clueLetters[shipIndex][attemptIndex];
        clueImageName = gameData.clueImageName[baseMark - 1];
        fileUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}${clueImageName}.png`;
    } else {
        attemptIndex = gameData.baseMarks[shipIndex].findIndex(mark => mark === gameIndex);
        baseMark = gameData.baseMarks[shipIndex][attemptIndex + 1];
        clueLetter = gameData.clueLetters[shipIndex][attemptIndex + 1];
        clueImageName = gameData.clueImageName[baseMark - 1];

        fileUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}${clueImageName}.png`;
    }

    res.json({
        titleName, 
        message, 
        baseMark, 
        clueLetter, 
        fileUrl
    });
});

module.exports = router;
