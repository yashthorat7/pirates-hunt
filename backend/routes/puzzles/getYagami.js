const express = require('express');
const router = express.Router();

const setName = ["(1)fdjks", "(2)zpxqy", "(3)nbvtu", "(4)hclwo"];

router.get('/getYagami', async (req, res) => {
    const { shipNo } = req.query;
    const setNo = ((parseInt(shipNo) - 11) % 4);
    const fileName = setName[setNo];

    res.json({
        puzzleData: {
            fileName: fileName
        }
    });
});

router.get('/getYagamiWin', async (req, res) => {
    const { shipNo } = req.query;
    // TODO: will as time thing
    res.json( {
        hasWon: true
    });
});

module.exports = router;