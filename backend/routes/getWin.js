const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', async (req, res) => {
    const { shipNo, winId } = req.query;
    if (winId === 'winnerhehum') {
        try {
            console.log('Writing ship', shipNo);
            await db.writeShipData('begintime', 10, shipNo);
            await db.writeShipData('unlocked', 10, shipNo, 1);
            res.status(200).send('Ship data written successfully');
        } catch (error) {
        res.status(500).send('Error writing ship data');
        }
    }
});

module.exports = router;
