const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const { validateShipNo } = require("../middleware/validator");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", 
    validateShipNo, 
    asyncHandler(gameController.getWin)
);

module.exports = router;
