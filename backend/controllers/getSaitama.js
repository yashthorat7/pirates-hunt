const pirateWords = [
    "SHARK", "SWORD", "STORY", "COUNT",
    "CHEST", "SKULL", "BLACK", "WHITE",
    "STORM", "CORAL", "MUSIC", "DANCE",
    "SOUND", "RUMOR", "SLEEP", "SCORE"
];

const assignedWord = new Array(40).fill(null);

async function getGame(shipIndex) {
    const randomIndex = Math.floor(Math.random() * pirateWords.length);
    const word = pirateWords[randomIndex];
    assignedWord[shipIndex] = word;
    return null;
}

async function getGameWin(shipIndex, userInputs) {
    let inputs = userInputs.split('');
    if (!inputs) {
        return { hasWon: false };
    }

    const cArr = inputs;
    const word = (assignedWord[shipIndex] || '').toUpperCase();
    const wArr = word.split('');

    const letterCount = {};
    wArr.forEach(c => {
        letterCount[c] = (letterCount[c] || 0) + 1;
    });

    const result = Array(5).fill(0);

    for (let i = 0; i < 5; i++) {
        if (wArr[i] === cArr[i]) {
            result[i] = 2;
            letterCount[cArr[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i] === 0 && letterCount[cArr[i]] > 0) {
            result[i] = 1;
            letterCount[cArr[i]]--;
        }
    }

    return {
        hasWon: word === userInputs,
        result
    };
}

module.exports = { getGame, getGameWin };
