const express = require("express");
const router = express.Router();
const gameData = require("../data/gameData");
const db = require("../config/db");

const winModules = {
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
  const { gameId, shipNo, userInputs } = req.query;
  const shipIndex = parseInt(shipNo) - 11;
  const index = gameData.gameId.findIndex((id) => id === gameId);
  const gameNo = index + 1;
  const outroId = gameData.outroId[index];

  let parsedInputs;
  try {
    parsedInputs = JSON.parse(userInputs);
  } catch (error) {
    console.error("Error parsing userInputs:", error);
  }

  const { getGameWin } = require(winModules[gameNo]);
  let result =
    parsedInputs.length !== 0
      ? await getGameWin(shipIndex, parsedInputs)
      : await getGameWin();

  if (result.hasWon) {
    await db.writeShipData("endtime", gameNo, shipNo);
    await db.writeShipData("unlocked", gameNo, shipNo, 1);
  }

  res.json(
    result.hasWon
      ? {
          ...result,
          redirect: `../../outro/outro.html?ship=${shipNo}&id=${outroId}`,
        }
      : result
  );
});

module.exports = router;
