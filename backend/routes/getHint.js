const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/getHint', (req, res) => {
    const gameNo = parseInt(req.query.gameNo) - 1;
    const shipNo = parseInt(req.query.shipNo) - 11;
    // set endtimes

    // if (timeDiffMinutes >= 12) {
        res.json({ message: "Times Up! Here we have solved it for you",
            link: `../../outro/outro.html?ship=${shipNo}` });
    // }
});

module.exports = router;