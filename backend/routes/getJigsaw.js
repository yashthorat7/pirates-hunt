const express = require('express');
const router = express.Router();
const fs = require('fs');
const ImageKit = require('imagekit');
const gameNo = 1;

const { writeShipData } = require('./db'); 

const imagekit = new ImageKit({
    publicKey: "public_KQUJu1OFWc7qLBzq9ERm9VEVf2I=",
    privateKey: "private_fK+TlWNa9iqf359UPIdY46aK7Zw=",
    urlEndpoint: "https://ik.imagekit.io/kzx8uktwt"
    });

router.get('/getTiles', (req, res) => {
    const shipNo = parseInt(req.query.shipNo);
    const setNumber = (shipNo % 4) + 1;
    const tileImages = Array.from({ length: 24 }, (_, i) =>
        imagekit.url({ path: `/Tiles/set${setNumber}/tile (${i + 1}).png` })
    );
    res.json({ tiles: tileImages });
});

router.get('/getJigsawWin', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo);

    await writeShipData('unlocked', shipNo, gameNo, 1);
    await writeShipData('solved', shipNo, gameNo, 1);

    res.json({ hasWon: true });
});


module.exports = router;