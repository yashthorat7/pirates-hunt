const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ImageKit = require('imagekit');
const gameNo = 1;

const imagekit = new ImageKit({
    publicKey: "public_KQUJu1OFWc7qLBzq9ERm9VEVf2I=",
    privateKey: "private_fK+TlWNa9iqf359UPIdY46aK7Zw=",
    urlEndpoint: "https://ik.imagekit.io/kzx8uktwt"
    });

router.get('/getTiles', (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const setNumber = (shipNo % 4) + 1;
    const tileImages = Array.from({ length: 24 }, (_, i) =>
        imagekit.url({ path: `/Tiles/set${setNumber}/tile (${i + 1}).png` })
    );
    res.json({ tiles: tileImages });
});

router.get('/getJigsawWin', (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;

    const shipFilePath = path.resolve(__dirname, '../data/shipLogs.json');
    const shipLogs = JSON.parse(fs.readFileSync(shipFilePath, 'utf8'));
    shipLogs[`ship${shipNo}`].Unlocked.split(', ').map(Number)[gameNo] = 1;
    shipLogs[`ship${shipNo}`].Solved.split(', ').map(Number)[gameNo] = 1;

    res.json({ hasWon });
});

module.exports = router;