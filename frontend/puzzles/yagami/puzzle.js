const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameId = new URLSearchParams(window.location.search).get('id');

const cols = 3;
const rows = 3;
let emptyBlockCoords = [2, 2];
let indexes = [];
let imageOrder = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let blocks = document.getElementsByClassName("puzzle-block");

initGame(1);
window.onload = function() {
    if (shipNo) {
        fetch(`https://pirateshuntbackend.onrender.com/api/puzzle/game?gameId=${gameId}&shipNo=${shipNo}`)
        .then(response => response.json())
        .then(data => {
            const slideImages = document.querySelectorAll('.puzzle-block img');
            const { fileName } = data;
            
            slideImages.forEach((img, index) => {
                const slideNumber = index + 1;
                img.src = `../../assets/yagami/${fileName}/slide (${slideNumber}).png`;
            });

            window.gameData = {
                titleName: data.titleName,
                messages: data.messages
            };
        });
    }
};

function initGame() {
    count = cols * rows;
    blocks = document.getElementsByClassName("puzzle-block");

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let blockIdx = x + y * cols;
            let block = blocks[blockIdx];
            positionBlockAtCoord(blockIdx, x, y);
            block.addEventListener('touchstart', () => onClickOnBlock(blockIdx));
            indexes.push(blockIdx);
        }
    }

    emptyBlockCoords = [rows - 1, cols - 1]; 
    indexes.push((rows - 1) * cols + (cols - 1)); 
    randomize();
}

function positionBlockAtCoord(blockIdx, x, y) {
    let block = blocks[blockIdx];
    block.style.left = (x * block.clientWidth) + "px";
    block.style.top = (y * block.clientHeight) + "px";
}

function randomize() {
    for (let i = 0; i < 100; i++) {
        let randomBlockIdx;
        do {
            randomBlockIdx = Math.floor(Math.random() * (count - 1));
        } while (!moveBlock(randomBlockIdx));
    }
}

function moveBlock(blockIdx) {
    let blockCoords = canMoveBlock(blocks[blockIdx]);
    if (blockCoords != null) {
        let emptyIdx = emptyBlockCoords[0] + emptyBlockCoords[1] * cols;

        let blockOrderIdx = blockCoords[0] + blockCoords[1] * cols;
        [imageOrder[blockOrderIdx], imageOrder[emptyIdx]] = [imageOrder[emptyIdx], imageOrder[blockOrderIdx]];

        positionBlockAtCoord(blockIdx, emptyBlockCoords[0], emptyBlockCoords[1]);
        emptyBlockCoords = blockCoords;
        return true;
    }
    return false;
}

function canMoveBlock(block) {
    let blockPos = [parseInt(block.style.left), parseInt(block.style.top)];
    let blockWidth = block.clientWidth;
    let blockCoords = [blockPos[0] / blockWidth, blockPos[1] / blockWidth];
    let diff = [
        Math.abs(blockCoords[0] - emptyBlockCoords[0]),
        Math.abs(blockCoords[1] - emptyBlockCoords[1])
    ];
    if ((diff[0] === 1 && diff[1] === 0) || (diff[0] === 0 && diff[1] === 1)) {
        return blockCoords;
    }
    return null;
}

function onClickOnBlock(blockIdx) {
    if (moveBlock(blockIdx)) {
        if (checkPuzzleSolved()) {
            document.querySelector('.game-part').style.pointerEvents = 'none';
            const emptyElement = document.querySelector('.empty');
            emptyElement.style.opacity = '1';
            emptyElement.style.animation = 'bounce-in 0.3s ease-in-out';
            fetch(`https://pirateshuntbackend.onrender.com/api/puzzle/move?gameId=${gameId}&shipNo=${shipNo}`)
            .then(response => response.json())
            .then(data => {
                if (data.hasWon) {
                    triggerUnlock(data.redirect);
                }
            });
        }
    }
}

function checkPuzzleSolved() {
    return imageOrder.join() === '1,2,3,4,5,6,7,8,0';
}

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;

        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });