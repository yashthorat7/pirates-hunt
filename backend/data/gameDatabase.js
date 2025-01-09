const fs = require('fs');
const path = require('path');

// Import message data from JSON files
const introMessages = require('./introMessages.json');
const connectMessages = require('./connectMessages.json');
const outroMessages = require('./outroMessages.json');

const gameData = {
    gameName: [
        "1-jigsaw", "2-count360", "3-maze", "4-stoneJump", "5-riddle",
        "6-wordGuess", "7-slides", "8-ghost", "9-bullsncows", "10-manuscripts"
    ],
    gameId: [
        "dsafe", "dysde", "sdeil", "ncied", "wnovs",
        "riqjn", "eiern", "dalsj", "weuir", "gfhyd"
    ],
    titleName: [
        "HOME", "HATTORI", "PARADISE", "GOKU", "AYASE",
        "SAITAMA", "YAGAMI", "HOLO", "TANJIRO", "UCHIHA"
    ],
    count360: {
        counts: [
            [2, 1, 11, 4],
            [3, 1, 16, 7],
            [1, 1, 12, 2],
            [0, 1, 19, 6]
        ]
    },
    bullsNCows: {
        secretCodes: [
            "6209", "8137", "8402", "9634", "7019", "2834", "9061", "3876", "5709", "9501",
            "1269", "7930", "7069", "8125", "5293", "3196", "1795", "8635", "7930", "7481",
            "4238", "8710", "9732", "8650", "9502", "8135", "3945", "9734", "4529", "2584",
            "8637", "4823", "6781", "2953", "0695", "8076", "3518", "9573", "7148", "6582"
        ]
    },
    stoneJump: {
        questionSet: [
            { riddleNo: 1, options: ['10', '20', '30'], correctAns: '10' },
            { riddleNo: 2, options: ['11', '21', '31'], correctAns: '21' },
            { riddleNo: 3, options: ['12', '22', '32'], correctAns: '32' },
            { riddleNo: 4, options: ['13', '23', '33'], correctAns: '13' },
            { riddleNo: 5, options: ['14', '24', '34'], correctAns: '14' },
            { riddleNo: 6, options: ['15', '25', '35'], correctAns: '25' },
            { riddleNo: 7, options: ['16', '26', '36'], correctAns: '16' },
            { riddleNo: 8, options: ['17', '27', '37'], correctAns: '17' },
            { riddleNo: 9, options: ['18', '28', '38'], correctAns: '28' },
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
        ]
    },
    wordGuess: {
        pirateWords: [
            "SHARK", "SWORD", "STORY", "COUNT", "CHEST",
            "SKULL", "BLACK", "WHITE", "STORM", "CORAL",
            "MUSIC", "DANCE", "SOUND", "RUMOR", "SLEEP",
            "SCORE"
        ]
    },
    ghost: {
        maxLives: 100
    },
    introMessages: {},  // To be populated from introMessages.json
    connectMessages: {}, // To be populated from connectMessages.json
    outroMessages: {},  // To be populated from outroMessages.json
};

// Runtime storage with initialization
const runtimeData = {
    questionLog: new Array(40).fill().map(() => new Array(6).fill(0)),
    questionIndex: new Array(40).fill(0),
    assignedWords: new Array(40).fill(null)
};

// Load persisted runtime data if available
const runtimeDataPath = path.join(__dirname, 'runtimeData.json');

const persistRuntimeData = () => {
    try {
        fs.writeFileSync(runtimeDataPath, JSON.stringify(runtimeData, null, 2));
    } catch (error) {
        console.error('Failed to persist runtime data:', error);
    }
};

try {
    if (fs.existsSync(runtimeDataPath)) {
        const savedData = JSON.parse(fs.readFileSync(runtimeDataPath, 'utf8'));
        Object.assign(runtimeData, savedData);
    }
} catch (error) {
    console.log('No persisted runtime data found or error loading:', error.message);
}

// Persist runtime data on process exit
process.on('exit', persistRuntimeData);
process.on('SIGINT', () => {
    persistRuntimeData();
    process.exit();
});

module.exports = {
    gameData,
    runtimeData
}; 