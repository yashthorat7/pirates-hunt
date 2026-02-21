const mazeName = ["(1)fsldk", "(2)gbnwe", "(3)omhfg", "(4)bnewl"];

async function getGame(shipIndex) {
    const mazeNo = shipIndex % 4;
    const fileName = mazeName[mazeNo];

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
