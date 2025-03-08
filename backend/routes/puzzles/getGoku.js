const express = require('express');
const db = require('../db');
const router = express.Router();

const questionSet = [
    { riddleNo:  1, options: ['10', '20', '30'], correctAns: '10' },
    { riddleNo:  2, options: ['11', '21', '31'], correctAns: '21' },
    { riddleNo:  3, options: ['12', '22', '32'], correctAns: '32' },
    { riddleNo:  4, options: ['13', '23', '33'], correctAns: '13' },
    { riddleNo:  5, options: ['14', '24', '34'], correctAns: '14' },
    { riddleNo:  6, options: ['15', '25', '35'], correctAns: '25' },
    { riddleNo:  7, options: ['16', '26', '36'], correctAns: '16' },
    { riddleNo:  8, options: ['17', '27', '37'], correctAns: '17' },
    { riddleNo:  9, options: ['18', '28', '38'], correctAns: '28' },
    { riddleNo: 10, options: ['19', '29', '39'], correctAns: '29' },
    { riddleNo: 11, options: ['20', '30', '40'], correctAns: '30' },
    { riddleNo: 12, options: ['21', '31', '41'], correctAns: '31' },
    { riddleNo: 13, options: ['22', '32', '42'], correctAns: '42' },
    { riddleNo: 14, options: ['23', '33', '43'], correctAns: '33' },
    { riddleNo: 15, options: ['24', '34', '44'], correctAns: '34' },
    { riddleNo: 16, options: ['25', '35', '45'], correctAns: '45' },
    { riddleNo: 17, options: ['26', '36', '46'], correctAns: '36' },
    { riddleNo: 18, options: ['27', '37', '47'], correctAns: '27' },
    { riddleNo: 19, options: ['28', '38', '48'], correctAns: '38' },
    { riddleNo: 20, options: ['29', '39', '49'], correctAns: '29' },
    { riddleNo: 21, options: ['30', '40', '50'], correctAns: '40' },
    { riddleNo: 22, options: ['31', '41', '51'], correctAns: '51' },
    { riddleNo: 23, options: ['32', '42', '52'], correctAns: '32' },
    { riddleNo: 24, options: ['33', '43', '53'], correctAns: '43' }
];

router.get('/getGoku', async (req, res) => {
    const shipNo = parseInt(req.query.shipNo, 10);
    let offset = (shipNo - 11) % 4;
    if (offset < 0) offset += 4;
    
    const prevStartTime = await db.readShipData('starttime', 4, shipNo);
    let timeWaited = prevStartTime !== 0 ? db.getTime() - prevStartTime : null;

    if (prevStartTime === 0 || timeWaited > 80) {
        let questions = [];
        for (let i = offset; i < questionSet.length; i += 4) {
            questions.push({
                riddleNo: questionSet[i].riddleNo,
                options: questionSet[i].options
            });
        }

        return res.json({
            puzzleData: {
                doWait: false,
                fileName: "fsdniew",
                questions
            }
        });
    }

    res.json({
        puzzleData: { doWait: true }
    });   
});

router.get('/getGokuWin', async (req, res) => {
    const userInput = JSON.parse(req.query.userInputs);

    const questionIndex = parseInt(userInput.riddleNo, 10) - 1;
    const isCorrect = questionSet[questionIndex].correctAns === userInput.answer;

    if (isCorrect && questionIndex >= 20) {
        res.json({
            isCorrect, hasWon: true,
        });
    } else {
        res.json({ isCorrect, hasWon: false });
    }
});

module.exports = router;