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

const count1 = [2, 1, 11, 4];
const count2 = [3, 1, 16, 7];
const count3 = [1, 1, 12, 2];
const count4 = [0, 1, 19, 6];

function get360count(shipNo) {
    const setNumber = shipNo % 4;
    console.log(setNumber);
    switch (setNumber) {
        case 0: return count1;
        case 1: return count2;
        case 2: return count3;
        case 3: return count4;
    }
}

function get360Win(shipNo, userInputs) {
    const correctCount = get360count(shipNo);
    const isMatch = correctCount.every((value, index) => value === userInputs[index]);
    return isMatch;
}
   
router.get('/get360Image', (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const imageNumber = (shipNo % 4) + 1;
    const link = imagekit.url({ path: `/Image360/image360 (${imageNumber}).webp` });
    res.json({ link });
});

router.get('/get360Win', (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const userInputs = JSON.parse(req.query.userInputs);
    const hasWon = get360Win(shipNo, userInputs);
    res.json({ hasWon });
});

module.exports = router;