const db = require("../config/db");
const gameData = require("../data/gameData");
const messages = require("../data/messages");

const getIntro = async (req, res) => {
    const { gameNo, introIndex } = req;
    const title = gameData.title[introIndex];
    const introMessages = messages.introMessages[gameNo];

    res.json({
        title,
        messages: introMessages
    });
};

const getIntroMove = async (req, res) => {
    const { introIndex, gameNo } = req;
    const { shipNo } = req.query;
    const gameId = gameData.gameId[introIndex];
    const outroId = gameData.outroId[introIndex];
    const title = gameData.title[introIndex];

    let isUnlocked;
    try {
        isUnlocked = await db.readShipData("unlocked", gameNo, shipNo);
    } catch (error) {
        isUnlocked = 0;
    }
    await db.writeShipData("begintime", gameNo, shipNo);

    const canOpen = isUnlocked > 0;
    const redirectLink = canOpen
        ? `../outro/outro.html?ship=${shipNo}&id=${outroId}`
        : `../puzzles/${title}/puzzle.html?ship=${shipNo}&id=${gameId}`;

    res.json({
        redirect: redirectLink,
    });
};

const getOutro = async (req, res) => {
    const { gameNo, shipIndex, outroIndex } = req;
    const title = gameData.title[outroIndex];
    const message = messages.outroMessages[gameNo];

    let attemptIndex;
    let baseMark, clueLetter, clueImageName;

    if (outroIndex === 0) {
        attemptIndex = 0;
        baseMark = gameData.baseMarks[shipIndex][attemptIndex];
        clueLetter = gameData.clueLetters[shipIndex][attemptIndex];
    } else {
        attemptIndex = gameData.baseMarks[shipIndex].findIndex(mark => mark === outroIndex);
        baseMark = gameData.baseMarks[shipIndex][attemptIndex + 1];
        clueLetter = gameData.clueLetters[shipIndex][attemptIndex + 1];
    }
    clueImageName = gameData.clueImageName[baseMark - 1];

    res.json({
        title,
        message,
        baseMark,
        clueLetter,
        clueImageName
    });
};

module.exports = {
    getIntro,
    getIntroMove,
    getOutro
};
