const counts = [
    [7, 2, 7, 4],
    [7, 3, 5, 2],
    [6, 1, 5, 5],
    [7, 2, 6, 3]
];

const imageNames = ['(1)lsdja', '(2)menkj', '(3)wenvi', '(4)xqztr'];

async function getGame(shipIndex) {
    const countNo = shipIndex % 4;
    const image = imageNames[countNo];
    return { image };
}

async function getGameWin(shipIndex, userInputs) {
    const setNo = shipIndex % 4;
    const correctCount = counts[setNo];

    const inputs = Array.isArray(userInputs) ? userInputs.map(Number) : [];
    if (inputs.length === 0) return { hasWon: false };
    
    const hasWon = correctCount.every((v, i) => v === inputs[i]);
    return { hasWon };
}

module.exports = { getGame, getGameWin };