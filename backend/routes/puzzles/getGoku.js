const express = require('express');
const db = require('../db');
const router = express.Router();

const questionSet = [
    { riddleNo:  1, options: ['6', '2', '4'], correctAns: '4' },
    { riddleNo:  2, options: ['5', '2', '6'], correctAns: '2' },
    { riddleNo:  3, options: ['8', '14', '12'], correctAns: '14' },
    { riddleNo:  4, options: ['10', '12', '9'], correctAns: '10' },
    { riddleNo:  5, options: ['E', 'D', 'C'], correctAns: 'E' },
    { riddleNo:  6, options: ['A', 'D', 'B'], correctAns: 'D' },
    { riddleNo:  7, options: ['W', 'M', 'J'], correctAns: 'J' },
    { riddleNo:  8, options: ['A', 'W', 'B'], correctAns: 'A' },
    { riddleNo:  9, options: ['12', '9', '11'], correctAns: '9' },
    { riddleNo: 10, options: ['19', '21', '18'], correctAns: '18' },
    { riddleNo: 11, options: ['15', '18', '12'], correctAns: '15' },
    { riddleNo: 12, options: ['11', '14', '9'], correctAns: '11' },
    { riddleNo: 13, options: ['N', 'E', 'W'], correctAns: 'E' },
    { riddleNo: 14, options: ['S', 'W', 'N'], correctAns: 'S' },
    { riddleNo: 15, options: ['N', 'S', 'W'], correctAns: 'W' },
    { riddleNo: 16, options: ['E', 'N', 'S'], correctAns: 'S' },
    { riddleNo: 17, options: ['IF', 'IB', 'IJ'], correctAns: 'IJ' },
    { riddleNo: 18, options: ['UG', 'IF', 'UC'], correctAns: 'IF' },
    { riddleNo: 19, options: ['TM', 'MF', 'NH'], correctAns: 'NH' },
    { riddleNo: 20, options: ['ML', 'LE', 'ES'], correctAns: 'ML' },
    { riddleNo: 21, options: ['35', '32', '33'], correctAns: '35' },
    { riddleNo: 22, options: ['23', '25', '22'], correctAns: '22' },
    { riddleNo: 23, options: ['19', '16', '20'], correctAns: '16' },
    { riddleNo: 24, options: ['44', '48', '49'], correctAns: '44' }
];

let startTimes = new Array(40).fill(0);

// Direct function to get puzzle data
async function getPuzzleData(shipNo) {
    const shipNoInt = parseInt(shipNo, 10);
    let offset = (shipNoInt - 11) % 4;
    if (offset < 0) offset += 4;
    const currentTime = db.getTime();
    const shipIndex = shipNoInt - 11;

    const prevStartTime = startTimes[shipIndex];

    let timeWaited = prevStartTime !== 0 ? currentTime - prevStartTime : null;
    if (prevStartTime === 0 || timeWaited >= 25) {
        startTimes[shipIndex] = currentTime;
        let questions = [];
        for (let i = offset; i < questionSet.length; i += 4) {
            questions.push({
                riddleNo: questionSet[i].riddleNo,
                options: questionSet[i].options
            });
        }
        return {
            puzzleData: {
                doWait: false,
                fileName: "fsdniew",
                questions
            }
        };
    }
    return {
        puzzleData: { doWait: true }
    };
}

// Direct function to check win condition
async function checkWinCondition(shipNo, userInputs = []) {
    if (!userInputs || !userInputs.length) {
        return { isCorrect: false, hasWon: false };
    }
    
    const userInput = userInputs[0];
    const questionIndex = parseInt(userInput.riddleNo, 10) - 1;
    const isCorrect = questionSet[questionIndex].correctAns === userInput.answer;

    if (isCorrect && questionIndex >= 20) {
        return {
            isCorrect, 
            hasWon: true,
        };
    } else {
        return { 
            isCorrect, 
            hasWon: false 
        };
    }
}

// Express routes that use the direct functions
router.get('/getGoku', async (req, res) => {
    const { shipNo } = req.query;
    const result = await getPuzzleData(shipNo);
    res.json(result);
});

router.get('/getGokuWin', async (req, res) => {
    const { shipNo, userInputs } = req.query;
    let parsedInputs = [];
    try {
        parsedInputs = [JSON.parse(userInputs)];
    } catch (error) {
        console.error('Error parsing userInputs:', error);
    }
    const result = await checkWinCondition(shipNo, parsedInputs);
    res.json(result);
});

// Export both the router and the direct functions
module.exports = router;
module.exports.getPuzzleData = getPuzzleData;
module.exports.checkWinCondition = checkWinCondition;