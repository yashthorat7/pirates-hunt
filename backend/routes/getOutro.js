const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const introController = require('../controllers/introController');
const { validateShipNo, validateOutroId } = require('../middleware/validator');
const asyncHandler = require('../utils/asyncHandler');

router.get('/', 
    validateShipNo, 
    validateOutroId(gameData), 
    asyncHandler(introController.getOutro)
);

module.exports = router;
