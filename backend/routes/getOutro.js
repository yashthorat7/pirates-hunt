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

const checkpointsFilePath = path.resolve(__dirname, '../data/checkpoints.json');
let checkpointsData;

const data = fs.readFileSync(checkpointsFilePath, 'utf8');
checkpointsData = JSON.parse(data);

router.get('/getClueLetter', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;
    res.json({ letter: checkpointsData.clueLetters[shipNo][gameNo] });
});

router.get('/getBaseMark', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;
    res.json({ letter: checkpointsData.nextCheckPoint[shipNo][gameNo] });
});

router.get('/getCheckpointImage', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;

    const imageNo = checkpointsData.nextCheckPoint[shipNo][gameNo];
    const imageUrl = imagekit.url({ path: `/Checkpoint/checkpoint (${imageNo}).png` });
    res.json({ imageUrl });
});

module.exports = router;
