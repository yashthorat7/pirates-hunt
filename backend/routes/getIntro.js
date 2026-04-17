const express = require('express');
const router = express.Router();
const gameData = require('../data/gameData');
const introController = require('../controllers/introController');
const { validateIntroId } = require('../middleware/validator');
const asyncHandler = require('../utils/asyncHandler');

router.get('/', 
    validateIntroId(gameData), 
    asyncHandler(introController.getIntro)
);

module.exports = router;
