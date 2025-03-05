const express = require('express');
const router = express.Router();

const mazeName = ["(1)fsldk", "(2)gbnwe", "(3)omhfg", "(4)bnewl"];

router.get('/getParadise', async (req, res) => {
    const { shipNo } = req.query;
    const mazeNo = ((parseInt(shipNo) - 11) % 4);
    const fileName = mazeName[mazeNo];

    res.json({
        puzzleData: {
            fileName: fileName
        }
    });
});

router.get('/getParadiseWin', async (req, res) => {
    const { shipNo } = req.query;
    res.json( {
        hasWon: true
    });
});

module.exports = router;