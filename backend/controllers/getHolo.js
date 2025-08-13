const MAX_LIVES = 150;

async function getGame(shipIndex) {
    const lives = MAX_LIVES;
    return {
        lives
    };
}

async function getGameWin(shipIndex, userInputs) {
    const remainingCount = Array.isArray(userInputs) && userInputs.length > 0
        ? parseInt(userInputs[0]) || 0
        : 0;
    const hasWon = remainingCount == 0;

    return { hasWon };
}

module.exports = { getGame, getGameWin };
