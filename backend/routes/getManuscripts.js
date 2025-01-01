const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');
const gameNo = 10;

const { writeShipData } = require('./db'); 

const imagekit = new ImageKit({
    publicKey: "public_KQUJu1OFWc7qLBzq9ERm9VEVf2I=",
    privateKey: "private_fK+TlWNa9iqf359UPIdY46aK7Zw=",
    urlEndpoint: "https://ik.imagekit.io/kzx8uktwt"
    }); 

app.get('/getManuscriptWin', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const guessedArray = (req.query.guessedArray).split('');
    const hasWon = clueLetters[shipNo]?.every((char, index) => char === guessedArray[index]) || false;
    let maplink = null;
    if (hasWon) {
        await writeShipData('Unlocked', shipNo, gameNo, 1);
        await writeShipData('Solved', shipNo, gameNo, 1);
        maplink = imagekit.url({ path: `/map.png` })
    }
    res.json({ hasWon, maplink });
});

module.exports = router