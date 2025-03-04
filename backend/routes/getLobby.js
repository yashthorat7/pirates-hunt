const express = require('express');
const router = express.Router();

const correctPassword = 'OKIDOKI';

router.get('/', async (req, res) => {
    const { password } = req.query;
    if (password === correctPassword) {
        res.json({
            success: true,
            redirect: 'http://127.0.0.1:5500/frontend/intro/intro.html?id=vujkqpxyt'
        });
    } else {
        res.json({
            success: false
        });
    }
});

module.exports = router;