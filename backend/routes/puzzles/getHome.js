const setName = ["(1)fdjks", "(2)zpxqy", "(3)nbvtu", "(4)hclwo"];

async function getGame(shipIndex) {
    const setNo = shipIndex % 4;
    const fileName = setName[setNo];

    return {
        fileName
    };
}

async function getGameWin() {
    return {
        hasWon: true
    };
}

module.exports = { getGame, getGameWin };
