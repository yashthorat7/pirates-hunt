const db = require('./db');

const questionSet = [
    { riddleNo: 1, options: ['45', '24', '40'], correctAns: '40' },
    { riddleNo: 2, options: ['62', '60', '50'], correctAns: '60' },
    { riddleNo: 3, options: ['55', '60', '40'], correctAns: '55' },
    { riddleNo: 4, options: ['52', '38', '48'], correctAns: '48' },
    { riddleNo: 5, options: ['32', '28', '24'], correctAns: '24' },
    { riddleNo: 6, options: ['15', '17', '22'], correctAns: '17' },
    { riddleNo: 7, options: ['12', '15', '18'], correctAns: '18' },
    { riddleNo: 8, options: ['31', '19', '33'], correctAns: '19' },
    { riddleNo: 9, options: ['Q', 'P', 'S'], correctAns: 'S' },
    { riddleNo: 10, options: ['R', 'P', 'S'], correctAns: 'R' },
    { riddleNo: 11, options: ['T', 'Q', 'P'], correctAns: 'P' },
    { riddleNo: 12, options: ['Q', 'S', 'T'], correctAns: 'S' },
    { riddleNo: 13, options: ['21', '17', '18'], correctAns: '17' },
    { riddleNo: 14, options: ['7', '12', '10'], correctAns: '10' },
    { riddleNo: 15, options: ['18', '15', '12'], correctAns: '18' },
    { riddleNo: 16, options: ['15', '11', '12'], correctAns: '12' },
    { riddleNo: 17, options: ['E', 'W', 'N'], correctAns: 'W' },
    { riddleNo: 18, options: ['S', 'N', 'E'], correctAns: 'E' },
    { riddleNo: 19, options: ['N', 'W', 'S'], correctAns: 'N' },
    { riddleNo: 20, options: ['E', 'S', 'W'], correctAns: 'S' },
    { riddleNo: 21, options: ['QB', 'RI', 'ST'], correctAns: 'QB' },
    { riddleNo: 22, options: ['GW', 'TH', 'PU'], correctAns: 'PU' },
    { riddleNo: 23, options: ['XT', 'CU', 'ZF'], correctAns: 'CU' },
    { riddleNo: 24, options: ['IT', 'YU', 'EW'], correctAns: 'IT' }
];

let startTimes = new Array(40).fill(0);

async function getGame(shipIndex) {
    let offset = shipIndex % 4;
    if (offset < 0) offset += 4;

    const currentTime = db.getTime();
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
            doWait: false,
            fileName: "fsdniew",
            questions
        };
    }

    return {
        doWait: true
    };
}

async function getGameWin(shipIndex, userInputs) {
    const [riddleNo, answerRaw] = JSON.parse(userInputs);

    const questionIndex = riddleNo - 1;
    const correctAnsRaw = questionSet[questionIndex].correctAns;

    const normalize = str => str?.toString().trim().toLowerCase();
    const answer = normalize(answerRaw);
    const correctAns = normalize(correctAnsRaw);

    const isCorrect = answer === correctAns;
    const hasWon = isCorrect && questionIndex >= 20;
    return {
        isCorrect, hasWon
    };
}

module.exports = { getGame, getGameWin };