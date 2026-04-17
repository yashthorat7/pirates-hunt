const { SHIP_START_NO, SHIP_END_NO } = require('../constants/gameConstants');

const validateShipNo = (req, res, next) => {
    const shipNo = parseInt(req.query.shipNo, 10);
    if (isNaN(shipNo) || shipNo < SHIP_START_NO || shipNo > SHIP_END_NO) {
        return res.status(400).json({ error: `Invalid shipNo. Must be between ${SHIP_START_NO} and ${SHIP_END_NO}.` });
    }
    req.shipIndex = shipNo - SHIP_START_NO;
    next();
};

const validateGameId = (gameData) => (req, res, next) => {
    const { gameId } = req.query;
    const index = gameData.gameId.findIndex((id) => id === gameId);
    if (index === -1) {
        return res.status(404).json({ error: "Game not found" });
    }
    req.gameIndex = index;
    req.gameNo = index + 1;
    next();
};

const validateIntroId = (gameData) => (req, res, next) => {
    const { introId } = req.query;
    const index = gameData.introId.findIndex((id) => id === introId);
    if (index === -1) {
        return res.status(404).json({ error: "Intro not found" });
    }
    req.introIndex = index;
    req.gameNo = index + 1;
    next();
};

const validateOutroId = (gameData) => (req, res, next) => {
    const { outroId } = req.query;
    const index = gameData.outroId.findIndex((id) => id === outroId);
    if (index === -1) {
        return res.status(404).json({ error: "Outro not found" });
    }
    req.outroIndex = index;
    req.gameNo = index + 1;
    next();
};

module.exports = {
    validateShipNo,
    validateGameId,
    validateIntroId,
    validateOutroId
};
