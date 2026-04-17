const gameData = require('../data/gameData');

async function getGame(shipIndex) {
    return null;
}

async function getGameWin(shipIndex, userInputs) {
    if (!Array.isArray(userInputs)) return { hasWon: false };
    
    const correctSequence = gameData.clueLetters[shipIndex];
    if (!correctSequence) return { hasWon: false };

    const guessedArray = userInputs.map(String).slice(0, 8);

    let isWin = true;
    for (let i = 0; i < 8; i++) {
        if (guessedArray[i] !== correctSequence[i]) {
            isWin = false;
            break;
        }
    }

    return isWin
        ? { hasWon: true, fileName: "../../assets/skullis/cvhasui.png" }
        : { hasWon: false };
}

module.exports = { getGame, getGameWin };

