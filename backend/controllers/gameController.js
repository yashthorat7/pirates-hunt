const db = require("../config/db");
const gameData = require("../data/gameData");
const connectMessages = require("../data/messages");
const { HINT_TIME_MINUTES } = require("../constants/gameConstants");

const getGame = async (req, res) => {
    const { gameNo, shipIndex } = req;
    const { shipNo } = req.query;
    const title = gameData.title[req.gameIndex];
    const messages = connectMessages.connectMessages[gameNo];

    const { getGame: getPuzzleData } = require(gameData.puzzleModules[gameNo]);
    let data = await getPuzzleData(shipIndex);

    await db.writeShipData("starttime", gameNo, shipNo);

    res.json({
        title,
        messages,
        ...data,
    });
};

const getGameMove = async (req, res) => {
    const { gameNo, shipIndex } = req;
    const { shipNo, userInputs } = req.query;
    const outroId = gameData.outroId[req.gameIndex];

    let parsedInputs = [];
    if (userInputs) {
        try {
            parsedInputs = JSON.parse(userInputs);
        } catch (error) {
            return res.status(400).json({ error: "Invalid userInputs format" });
        }
    }

    const { getGameWin } = require(gameData.puzzleModules[gameNo]);
    let result = await getGameWin(shipIndex, parsedInputs);

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
};

const StartTimeCache = new Array(40).fill(null);

const getHint = async (req, res) => {
    const { gameNo, shipIndex } = req;
    const { shipNo } = req.query;
    const outroId = gameData.outroId[req.gameIndex];

    if (StartTimeCache[shipIndex] === null || StartTimeCache[shipIndex] === 0) {
        const dbstartTime = await db.readShipData("starttime", gameNo, shipNo);
        StartTimeCache[shipIndex] = dbstartTime || 0;
    }

    const startTime = StartTimeCache[shipIndex];
    const currentTime = db.getTime();
    const timeDiffMinutes = (currentTime - startTime) / 60;

    if (timeDiffMinutes >= HINT_TIME_MINUTES && startTime !== 0) {
        await db.writeShipData("endtime", gameNo, shipNo);
        await db.writeShipData("unlocked", gameNo, shipNo, 2);

        res.json({
            message: "Times Up! Here, I have solved it for you",
            redirect: `../../outro/outro.html?ship=${shipNo}&id=${outroId}`,
        });
    } else {
        res.status(200).json({ message: "Hint not yet available" });
    }
};

const getWin = async (req, res) => {
    const { shipNo, winId } = req.query;
    if (winId === "victoryq") {
        await db.writeShipData("begintime", 10, shipNo);
        await db.writeShipData("unlocked", 10, shipNo, 1);
        res.status(200).json({ message: "Ship data written successfully" });
    } else {
        res.status(400).json({ error: "Invalid winId" });
    }
};

module.exports = {
    getGame,
    getGameMove,
    getHint,
    getWin
};
