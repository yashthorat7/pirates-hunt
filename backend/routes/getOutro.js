const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');
const { readClue, readShipData } = require('./db');

const imagekit = new ImageKit({
    publicKey: "public_KQUJu1OFWc7qLBzq9ERm9VEVf2I=",
    privateKey: "private_fK+TlWNa9iqf359UPIdY46aK7Zw=",
    urlEndpoint: "https://ik.imagekit.io/kzx8uktwt"
});

router.get('/getOutro', async (req, res) => {
    const gameNo = parseInt(req.query.gameNo);
    const shipNo = parseInt(req.query.shipNo);
    console.log('getoutro');
    const hasUnlocked = await readShipData('Unlocked', shipNo, gameNo);
    console.log('hasUnlocked', hasUnlocked);
    if (hasUnlocked) {
        const clue = await readClue(shipNo, gameNo);
        const baseMark = clue[0];
        const clueLetter = clue[1];
        const imageUrl = imagekit.url({ path: `/Checkpoint/checkpoint (${baseMark}).png` });
        console.log(imageUrl, baseMark, clueLetter);
        res.json({ imageUrl, baseMark, clueLetter });
    }
});

module.exports = router; 