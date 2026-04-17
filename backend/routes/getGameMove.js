const express = require("express");
const router = express.Router();
const gameData = require("../data/gameData");
const gameController = require("../controllers/gameController");
const { validateShipNo, validateGameId } = require("../middleware/validator");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", 
    validateShipNo, 
    validateGameId(gameData), 
    asyncHandler(gameController.getGameMove)
);

module.exports = router;
