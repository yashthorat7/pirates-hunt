const fs = require('fs');
const path = require('path');

const gameData = {
    introId: ["vujkqpxyt", "zgwnlthdf", "odrbfajke", "xipmyelza", "twahqlkto",
        "ndojrmxyp", "kuzpfidhc", "ylxqtwoba", "cmhajrvnz", "veqlknstu"],
    gameId: ["qkwzohpfa", "votrpjlek", "nxehdfzuy", "zyquablmn", "wdoktmprs",
        "parvgsjwx", "xiehlcqby", "flzqtpmdn", "hcmujnves", "skidrpowa"],
    outroId: ["bhxrmqjky", "kouvlnatz", "twyzfjepq", "lapgmrchs", "vzonkeubl",
        "dithcqawy", "fmxpljokn", "qbrnkswxy", "jwlefoatz", "czkvutgrs"],
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
    introMessages: {
        "1": [
        "Ahoy! Ready for a pirate adventure? Sail the seas and hunt for treasure!",
        "Use your map to explore, solve puzzles, and watch out for danger!",
        "Your choices will lead to treasure... or trouble. Good luck, matey!"
        ],
        "2": [
            "Welcome back, pirate! Your ship’s ready to sail.",
            "Manage your crew and resources as you search for Blackbeard’s treasure.",
            "Other pirates are after it too, so keep your wits sharp!"
        ],
        "3": [
            "Yo ho ho! Prepare for a wild ride on the Pirate King’s ship.",
            "Battle rival pirates, solve riddles, and unlock new treasures.",
            "Trust your compass and watch out for treacherous waters!"
        ],
        "4": [
            "The Pirate’s Revenge is on! Sail through storms and dangerous waters.",
            "Upgrade your ship, gather supplies, and fight to be the Pirate King!",
            "Survive, find allies, and claim your loot!"
        ],
        "5": [
            "Ahoy, mate! Your journey starts on a mysterious island.",
            "Explore the jungle, solve puzzles, and find hidden pirate treasure.",
            "Danger’s around every corner, so stay sharp and trust your gut!"
        ],
        "6": [
            "Ahoy! Ready for a pirate adventure? Sail the seas and hunt for treasure!",
            "Use your map to explore, solve puzzles, and watch out for danger!",
            "Your choices will lead to treasure... or trouble. Good luck, matey!"
        ],
        "7": [
            "Welcome back, pirate! Your ship’s ready to sail.",
            "Manage your crew and resources as you search for Blackbeard’s treasure.",
            "Other pirates are after it too, so keep your wits sharp!"
        ],
        "8": [
            "Yo ho ho! Prepare for a wild ride on the Pirate King’s ship.",
            "Battle rival pirates, solve riddles, and unlock new treasures.",
            "Trust your compass and watch out for treacherous waters!"
        ],
        "9": [
            "The Pirate’s Revenge is on! Sail through storms and dangerous waters.",
            "Upgrade your ship, gather supplies, and fight to be the Pirate King!",
            "Survive, find allies, and claim your loot!"
        ],
        "10": [
            "Ahoy, mate! Your journey starts on a mysterious island.",
            "Explore the jungle, solve puzzles, and find hidden pirate treasure.",
            "Danger’s around every corner, so stay sharp and trust your gut!"
        ]
    },
    connectMessages: {
        "1": [
            "Ahoy! Ready for a pirate adventure? Sail the seas and hunt for treasure!",
            "Use your map to explore, solve puzzles, and watch out for danger!",
            "Your choices will lead to treasure... or trouble. Good luck, matey!"
        ],
        "2": [
            "Welcome back, pirate! Your ship’s ready to sail.",
            "Manage your crew and resources as you search for Blackbeard’s treasure.",
            "Other pirates are after it too, so keep your wits sharp!"
        ],
        "3": [
            "Yo ho ho! Prepare for a wild ride on the Pirate King’s ship.",
            "Battle rival pirates, solve riddles, and unlock new treasures.",
            "Trust your compass and watch out for treacherous waters!"
        ],
        "4": [
            "The Pirate’s Revenge is on! Sail through storms and dangerous waters.",
            "Upgrade your ship, gather supplies, and fight to be the Pirate King!",
            "Survive, find allies, and claim your loot!"
        ],
        "5": [
            "Ahoy, mate! Your journey starts on a mysterious island.",
            "Explore the jungle, solve puzzles, and find hidden pirate treasure.",
            "Danger’s around every corner, so stay sharp and trust your gut!"
        ],
        "6": [
            "Ahoy! Ready for a pirate adventure? Sail the seas and hunt for treasure!",
            "Use your map to explore, solve puzzles, and watch out for danger!",
            "Your choices will lead to treasure... or trouble. Good luck, matey!"
        ],
        "7": [
            "Welcome back, pirate! Your ship’s ready to sail.",
            "Manage your crew and resources as you search for Blackbeard’s treasure.",
            "Other pirates are after it too, so keep your wits sharp!"
        ],
        "8": [
            "Yo ho ho! Prepare for a wild ride on the Pirate King’s ship.",
            "Battle rival pirates, solve riddles, and unlock new treasures.",
            "Trust your compass and watch out for treacherous waters!"
        ],
        "9": [
            "The Pirate’s Revenge is on! Sail through storms and dangerous waters.",
            "Upgrade your ship, gather supplies, and fight to be the Pirate King!",
            "Survive, find allies, and claim your loot!"
        ],
        "10": [
            "Ahoy, mate! Your journey starts on a mysterious island.",
            "Explore the jungle, solve puzzles, and find hidden pirate treasure.",
            "Danger’s around every corner, so stay sharp and trust your gut!"
        ]
    },
    outroMessages: {
        "1": "This is the first game",
        "2": "This is the second game",
        "3": "This is the third game",
        "4": "This is the fourth game",
        "5": "This is the fifth game",
        "6": "This is the sixth game",
        "7": "This is the seventh game",
        "8": "This is the eighth game",
        "9": "This is the ninth game",
        "10": "This is the tenth game"
    }, 
};

const runtimeData = {
    questionLog: new Array(40).fill().map(() => new Array(6).fill(0)),
    questionIndex: new Array(40).fill(0),
    assignedWords: new Array(40).fill(null)
};

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

process.on('exit', persistRuntimeData);
process.on('SIGINT', () => {
    persistRuntimeData();
    process.exit();
});

module.exports = {
    gameData,
    runtimeData
}; 