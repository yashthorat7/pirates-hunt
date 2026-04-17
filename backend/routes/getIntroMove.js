const express = require("express");
const router = express.Router();
const gameData = require("../data/gameData");
const introController = require("../controllers/introController");
const { validateShipNo, validateIntroId } = require("../middleware/validator");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", 
    validateShipNo, 
    validateIntroId(gameData), 
    asyncHandler(introController.getIntroMove)
);

module.exports = router;
