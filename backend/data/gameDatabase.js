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
    introMessages: {
        // ... copy from introMessages.json
    },
    connectMessages: {
        // ... copy from connectMessages.json
    },
    outroMessages: {
        // ... copy from outroMessages.json
    },
    bullsNCows: {
        secretCodes: [
            "6209", "8137", "8402", "9634", "7019", "2834", "9061", "3876", "5709", "9501",
            // ... rest of the codes
        ]
    },
    count360: {
        counts: [
            [2, 1, 11, 4],
            [3, 1, 16, 7],
            [1, 1, 12, 2],
            [0, 1, 19, 6]
        ]
    },
    stoneJump: {
        questionSet: [
            { riddleNo: 1, options: ['10', '20', '30'], correctAns: '10' },
            // ... rest of the questions
        ]
    },
    wordGuess: {
        pirateWords: [
            "SHARK", "SWORD", "STORY", "COUNT",
            "CHEST", "SKULL", "BLACK", "WHITE",
            "STORM", "CORAL", "MUSIC", "DANCE",
            "SOUND", "RUMOR", "SLEEP", "SCORE"
        ]
    }
};

// Runtime storage
const runtimeData = {
    questionLog: new Array(40).fill().map(() => new Array(6).fill(0)),
    questionIndex: new Array(40).fill(0),
    assignedWords: new Array(40).fill(null)
};

module.exports = {
    gameData,
    runtimeData
}; 