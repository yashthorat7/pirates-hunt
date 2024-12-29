const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');
const gameNo = 7;

const { writeShipData } = require('./db'); 

const imagekit = new ImageKit({
    publicKey: "public_KQUJu1OFWc7qLBzq9ERm9VEVf2I=",
    privateKey: "private_fK+TlWNa9iqf359UPIdY46aK7Zw=",
    urlEndpoint: "https://ik.imagekit.io/kzx8uktwt"
    });

router.get('/getSlides', (req, res) => {
    const shipNo = parseInt(req.query.shipNo) - 11;
    const setNumber = (shipNo % 4) + 1;
    const slideImages = Array.from({ length: 9 }, (_, i) =>
        imagekit.url({ path: `/Slides/set${setNumber}/slide (${i + 1}).png` })
    );
    res.json({ slides: slideImages });
});

router.get('/getSlidesWin', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo);
    await writeShipData('Unlocked', shipNo, gameNo, 1);
    await writeShipData('Solved', shipNo, gameNo, 1);
    res.json({ hasWon: true });
});

module.exports = router;