const fs = require('fs');
const path = require('path');

const gameData = {
    introId: [
        "vujkqpxyt", "zgwnlthdf", "odrbfajke", "xipmyelza", "twahqlkto",
        "ndojrmxyp", "kuzpfidhc", "ylxqtwoba", "cmhajrvnz", "veqlknstu"
    ],
    gameId: [
        "qkwzohpfa", "votrpjlek", "nxehdfzuy", "zyquablmn", "wdoktmprs",
        "parvgsjwx", "xiehlcqby", "flzqtpmdn", "hcmujnves", "skidrpowa"
    ],
    outroId: [
        "bhxrmqjky", "kouvlnatz", "twyzfjepq", "lapgmrchs", "vzonkeubl",
        "dithcqawy", "fmxpljokn", "qbrnkswxy", "jwlefoatz", "czkvutgrs"
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
            "SHARK", "SWORD", "STORY", "COUNT",
            "CHEST", "SKULL", "BLACK", "WHITE",
            "STORM", "CORAL", "MUSIC", "DANCE",
            "SOUND", "RUMOR", "SLEEP", "SCORE"
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
    baseMarks: [
        [5, 8, 3, 1, 12, 10, 15, 13, 18],
        [6, 4, 1, 7, 9, 15, 14, 12, 19],
        [3, 2, 7, 5, 9, 11, 14, 15, 19],
        [2, 3, 5, 7, 9, 13, 12, 16, 17],
        [3, 8, 5, 1, 13, 10, 16, 12, 20],
        [3, 5, 2, 8, 13, 9, 16, 12, 19],
        [2, 4, 5, 7, 9, 13, 15, 12, 18],
        [1, 5, 3, 7, 10, 14, 16, 12, 19],
        [6, 1, 7, 4, 10, 11, 13, 16, 20],
        [1, 8, 5, 3, 14, 11, 10, 16, 20],
        [4, 6, 1, 8, 16, 12, 14, 10, 17],
        [4, 1, 7, 5, 10, 14, 11, 16, 20],
        [2, 5, 4, 7, 15, 12, 13, 9, 20],
        [4, 1, 8, 5, 16, 13, 12, 9, 20],
        [3, 5, 1, 7, 13, 11, 15, 9, 20],
        [7, 2, 3, 6, 13, 12, 15, 10, 17],
        [1, 7, 4, 5, 14, 10, 15, 11, 20],
        [3, 7, 1, 6, 11, 14, 10, 15, 17],
        [4, 6, 8, 2, 15, 13, 9, 12, 18],
        [8, 6, 4, 2, 15, 9, 14, 12, 20],
        [1, 3, 6, 8, 9, 16, 14, 11, 17],
        [8, 3, 1, 6, 12, 10, 15, 14, 18],
        [5, 4, 2, 8, 13, 9, 11, 16, 19],
        [5, 3, 2, 7, 16, 14, 11, 10, 20],
        [1, 7, 4, 6, 11, 14, 15, 10, 17],
        [6, 2, 4, 7, 10, 13, 15, 12, 20],
        [7, 2, 4, 6, 13, 12, 9, 15, 17],
        [8, 3, 6, 2, 13, 12, 15, 10, 19],
        [7, 5, 1, 4, 16, 9, 13, 12, 17],
        [4, 1, 8, 6, 11, 10, 13, 16, 17],
        [6, 1, 3, 7, 14, 11, 16, 9, 20],
        [8, 2, 6, 4, 11, 14, 10, 16, 20],
        [5, 2, 3, 7, 16, 13, 12, 9, 18],
        [8, 6, 2, 4, 11, 14, 16, 9, 20],
        [6, 8, 4, 2, 16, 10, 13, 12, 20],
        [4, 2, 5, 8, 11, 10, 16, 14, 20],
        [8, 5, 1, 3, 11, 13, 10, 16, 19],
        [7, 6, 1, 4, 9, 15, 13, 11, 18],
        [1, 4, 5, 7, 13, 16, 12, 10, 18],
        [7, 2, 6, 3, 15, 11, 14, 9, 18]
    ],
    clueLetters: [
        ["D", "H", "A", "B", "F", "I", "C", "G", "E"],
        ["E", "I", "A", "C", "F", "H", "B", "D", "G"],
        ["H", "F", "E", "G", "B", "D", "I", "C", "A"],
        ["F", "H", "D", "I", "C", "E", "B", "G", "A"],
        ["G", "B", "C", "E", "H", "D", "F", "A", "I"],
        ["C", "A", "E", "B", "F", "I", "D", "H", "G"],
        ["H", "A", "F", "D", "E", "I", "G", "B", "C"],
        ["F", "C", "H", "A", "E", "G", "I", "B", "D"],
        ["H", "B", "E", "I", "D", "G", "A", "C", "F"],
        ["G", "I", "F", "A", "E", "C", "H", "D", "B"],
        ["B", "C", "H", "D", "I", "A", "F", "E", "G"],
        ["A", "I", "F", "D", "C", "G", "B", "E", "H"],
        ["H", "E", "G", "C", "A", "F", "I", "D", "B"],
        ["G", "D", "B", "F", "I", "H", "C", "A", "E"],
        ["H", "A", "G", "F", "C", "I", "D", "E", "B"],
        ["C", "E", "F", "I", "B", "G", "H", "A", "D"],
        ["G", "D", "A", "B", "H", "F", "E", "C", "I"],
        ["I", "C", "H", "B", "A", "E", "G", "F", "D"],
        ["F", "B", "H", "E", "C", "G", "D", "A", "I"],
        ["B", "I", "A", "E", "D", "G", "H", "C", "F"],
        ["D", "C", "F", "H", "I", "B", "G", "A", "E"],
        ["C", "E", "H", "D", "G", "F", "B", "I", "A"],
        ["A", "F", "C", "B", "D", "E", "G", "H", "I"],
        ["E", "G", "A", "D", "F", "H", "C", "I", "B"],
        ["G", "D", "H", "I", "F", "C", "A", "E", "B"],
        ["I", "A", "E", "C", "H", "G", "D", "F", "B"],
        ["D", "B", "I", "G", "C", "A", "H", "E", "F"],
        ["A", "H", "F", "D", "I", "B", "C", "E", "G"],
        ["B", "D", "H", "F", "C", "G", "I", "E", "A"],
        ["E", "H", "B", "A", "D", "G", "C", "I", "F"],
        ["F", "A", "D", "C", "G", "E", "I", "H", "B"],
        ["C", "I", "B", "G", "A", "F", "D", "H", "E"],
        ["H", "G", "A", "E", "I", "C", "B", "D", "F"],
        ["G", "H", "D", "F", "C", "E", "A", "B", "I"],
        ["I", "E", "A", "G", "H", "F", "B", "C", "D"],
        ["B", "F", "C", "A", "E", "I", "G", "D", "H"],
        ["D", "C", "I", "B", "H", "G", "F", "E", "A"],
        ["F", "A", "B", "G", "H", "C", "E", "I", "D"],
        ["A", "D", "G", "C", "E", "F", "B", "H", "I"],
        ["H", "C", "F", "E", "A", "I", "G", "D", "B"]
    ],
    clueImageName: [
        "(1)lpaey", "(2)ontih", "(3)aelrt", "(4)uoynr", "(5)ewrto",
        "(6)amnoh", "(7)sihte", "(8)btair", "(9)lpoea", "(10)ouldn",
        "(11)acrto", "(12)egnli", "(13)swloe", "(14)uoylk", "(15)apels",
        "(16)irtbe", "(17)aelpt", "(18)uoyrn", "(19)aemrt", "(20)ihlst"
      ],
};

module.exports = gameData;