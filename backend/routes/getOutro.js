const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');
const { readClue } = require('./db');

const imagekit = new ImageKit({
    publicKey: "public_KQUJu1OFWc7qLBzq9ERm9VEVf2I=",
    privateKey: "private_fK+TlWNa9iqf359UPIdY46aK7Zw=",
    urlEndpoint: "https://ik.imagekit.io/kzx8uktwt"
});

router.get('/getClueLetter', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    const clue = await readClue(shipNo, gameNo);
    const letter = clue[1];
    res.json({ letter });
});

router.get('/getBaseMark', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    const clue = await readClue(shipNo, gameNo);
    const baseMark = clue[0];
    res.json({ baseMark });
});

router.get('/getCheckpointImage', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    const clue = await readClue(shipNo, gameNo);
    const imageNo = clue[0];
    const imageUrl = imagekit.url({ path: `/Checkpoint/checkpoint (${imageNo}).png` });
    res.json({ imageUrl });
});

module.exports = router;
