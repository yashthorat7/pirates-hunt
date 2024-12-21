const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: "public_KQUJu1OFWc7qLBzq9ERm9VEVf2I=",
    privateKey: "private_fK+TlWNa9iqf359UPIdY46aK7Zw=",
    urlEndpoint: "https://ik.imagekit.io/kzx8uktwt"
    });

const gameFilePath = path.resolve(__dirname, '../data/gameData.json');
let gameData;

const data = fs.readFileSync(gameFilePath, 'utf8');
gameData = JSON.parse(data);

router.get('/getClueLetter', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;
    res.json({ letter: gameData.clueLetters[shipNo][gameNo] });
});

router.get('/getBaseMark', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;
    res.json({ letter: gameData.nextCheckPoint[shipNo][gameNo] });
});

router.get('/getCheckpointImage', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;

    const imageNo = gameData.nextCheckPoint[shipNo][gameNo];
    const imageUrl = imagekit.url({ path: `/Checkpoint/checkpoint (${imageNo}).png` });
    res.json({ imageUrl });
});

module.exports = router;
