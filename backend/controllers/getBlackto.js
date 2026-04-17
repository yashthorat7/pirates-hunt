const pirateWords = [
    "SHARK", "SWORD", "STORY", "COUNT",
    "CHEST", "SKULL", "BLACK", "WHITE",
    "STORM", "CORAL", "MUSIC", "DANCE",
    "SOUND", "RUMOR", "SLEEP", "SCORE"
];

const assignedWords = new Array(40).fill(null);

async function getGame(shipIndex) {
    const randomIndex = Math.floor(Math.random() * pirateWords.length);
    const word = pirateWords[randomIndex];
    assignedWords[shipIndex] = word;
    return null;
}

async function getGameWin(shipIndex, userInputs) {
    if (!Array.isArray(userInputs) || userInputs.length === 0) {
        return { hasWon: false };
    }

    const word = (assignedWords[shipIndex] || '').toUpperCase();
    if (!word) return { hasWon: false };

    const wArr = word.split('');
    const cArr = userInputs.map(c => c.toString().toUpperCase());

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
        hasWon: word === cArr.join(''),
        result
    };
}

module.exports = { getGame, getGameWin };
