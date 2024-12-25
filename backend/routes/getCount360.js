const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');
const gameNo = 2;
const { writeShipData }= require('./db');

const imagekit = new ImageKit({
    publicKey: "public_KQUJu1OFWc7qLBzq9ERm9VEVf2I=",
    privateKey: "private_fK+TlWNa9iqf359UPIdY46aK7Zw=",
    urlEndpoint: "https://ik.imagekit.io/kzx8uktwt"
});

const counts = [
    [2, 1, 11, 4],
    [3, 1, 16, 7],
    [1, 1, 12, 2],
    [0, 1, 19, 6],
];

const get360count = (shipNo) => counts[shipNo % 4];

const get360Win = (shipNo, userInputs) => {
    const correctCount = get360count(shipNo);
    console.log(correctCount);
    return correctCount.every((value, index) => value === userInputs[index]);
};

router.get('/get360Image', (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const link = imagekit.url({ path: `/Image360/image360 (${(shipNo % 4) + 1}).webp` });
    res.json({ link });
});

router.get('/get360Win', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo);
    const userInputs = JSON.parse(req.query.userInputs);
    const hasWon = get360Win(shipNo, userInputs);

    if (hasWon) {
        await writeShipData('unlocked', shipNo, gameNo, 1);
        await writeShipData('solved', shipNo, gameNo, 1);
    }
    res.json({ hasWon });
});

module.exports = router;
