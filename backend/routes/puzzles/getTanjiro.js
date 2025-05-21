const express = require('express');
const router = express.Router();

const secretCodes = [
    "6209", "8137", "8402", "9634", "7019", "2834", "9061", "3876", "5709", "9501",
    "1269", "7930", "7069", "8125", "5293", "3196", "1795", "8635", "7930", "7481",
    "4238", "8710", "9732", "8650", "9502", "8135", "3945", "9734", "4529", "2584",
    "8637", "4823", "6781", "2953", "0695", "8076", "3518", "9573", "7148", "6582"
];

// Direct function to get puzzle data
async function getPuzzleData(shipNo) {
    const setNo = ((parseInt(shipNo) - 11) % 4);

    return {
        puzzleData: {
            exists: setNo >= 0
        }
    };
}

// Direct function to check win condition
async function checkWinCondition(shipNo, userInputs = []) {
    const shipIndex = parseInt(shipNo) - 11;
    const guessedNo = userInputs.length > 0 ? String(userInputs[0]) : "";
    const secretCode = secretCodes[shipIndex];
    
    if (!guessedNo || !secretCode) {
        return { verdictArray: [guessedNo, 0, 0], hasWon: false };
    }
    
    const guessedArray = guessedNo.split('');
    const secretArray = secretCode.split('');

    let bulls = 0;
    let cows = 0;

    const secretMatched = Array(secretArray.length).fill(false);
    const guessedMatched = Array(guessedArray.length).fill(false);

    for (let i = 0; i < secretArray.length; i++) {
        if (guessedArray[i] === secretArray[i]) {
            bulls++;
            secretMatched[i] = true;
            guessedMatched[i] = true;
        }
    }

    for (let i = 0; i < guessedArray.length; i++) {
        if (!guessedMatched[i]) {
            for (let j = 0; j < secretArray.length; j++) {
                if (!secretMatched[j] && guessedArray[i] === secretArray[j]) {
                    cows++;
                    secretMatched[j] = true;
                    break;
                }
            }
        }
    }

    const verdictArray = [guessedNo, bulls, cows];
    const hasWon = bulls === 4;

    return { verdictArray, hasWon };
}

// Express routes that use the direct functions
router.get('/getTanjiro', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getTanjiroWin', async (req, res) => {
    const { shipNo, userInputs } = req.query;
    let parsedInputs = [];
    try {
        parsedInputs = [userInputs];
    } catch {
        // Keep default empty array if parsing fails
    }
    const result = await checkWinCondition(shipNo, parsedInputs);
    res.json(result);
});

// Export both the router and the direct functions
module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;