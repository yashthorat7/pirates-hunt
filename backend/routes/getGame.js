const express = require("express");
const router = express.Router();
const gameData = require("../data/gameData");
const connectMessages = require("../data/messages");
const db = require("../config/db");

const puzzleModules = {
  1: "../controllers/getSparrow",
  2: "../controllers/getRedbay",
  3: "../controllers/getSunreef",
  4: "../controllers/getIronbay",
  5: "../controllers/getBlackto",
  6: "../controllers/getStormy",
  7: "../controllers/getGoldbay",
  8: "../controllers/getDarkbay",
  9: "../controllers/getSkullis",
};

router.get("/", async (req, res) => {
  const { gameId, shipNo } = req.query;
  const shipIndex = parseInt(shipNo) - 11;
  const index = gameData.gameId.findIndex((id) => id === gameId);
  const gameNo = index + 1;
  const title = gameData.title[index];
  const messages = connectMessages.connectMessages[gameNo];

  const { getGame } = require(puzzleModules[gameNo]);
  let data = await getGame(shipIndex);

  await db.writeShipData("starttime", gameNo, shipNo);

  res.json({
    title,
    messages,
    ...data,
  });
});

module.exports = router;
