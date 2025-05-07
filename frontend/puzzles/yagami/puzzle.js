const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameId = new URLSearchParams(window.location.search).get('id');

const cols = 3;
const rows = 3;
let emptyBlockCoords = [2, 2];
let indexes = [];
let imageOrder = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let blocks = document.getElementsByClassName("puzzle-block");

initGame(1);
window.onload = async function() {
    if (shipNo) {
        const data = await API.getGame(gameId, shipNo);
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
    let randomMoves = rows * cols * 6;
    while (randomMoves-- > 0) {
        let emptyBlockCoordY = Math.floor(emptyBlockCoords[0]);
        let emptyBlockCoordX = Math.floor(emptyBlockCoords[1]);
        
        let coords = [
            [emptyBlockCoordY - 1, emptyBlockCoordX],
            [emptyBlockCoordY + 1, emptyBlockCoordX],
            [emptyBlockCoordY, emptyBlockCoordX - 1],
            [emptyBlockCoordY, emptyBlockCoordX + 1]
        ];
        
        let availableMoves = coords.filter(coord => canMoveBlock({blockCoords: coord}));
        if (availableMoves.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableMoves.length);
            let move = availableMoves[randomIndex];
            let blockIdx = move[0] * cols + move[1];
            moveBlock(blockIdx);
        }
    }
}

function moveBlock(blockIdx) {
    if (canMoveBlock(blocks[blockIdx])) {
        let block = blocks[blockIdx];
        let blockCoords = [Math.floor(blockIdx / cols), blockIdx % cols];
        
        let emptyBlockIndex = emptyBlockCoords[0] * cols + emptyBlockCoords[1];
        let emptyBlock = blocks[emptyBlockIndex];
        
        block.style.left = (emptyBlockCoords[1] * block.clientWidth) + "px";
        block.style.top = (emptyBlockCoords[0] * block.clientHeight) + "px";
        
        emptyBlock.style.left = (blockCoords[1] * block.clientWidth) + "px";
        emptyBlock.style.top = (blockCoords[0] * block.clientHeight) + "px";
        
        let blockOrderIndex = imageOrder.indexOf(parseInt(block.textContent));
        let emptyBlockOrderIndex = imageOrder.indexOf(0);
        
        [imageOrder[blockOrderIndex], imageOrder[emptyBlockOrderIndex]] = 
        [imageOrder[emptyBlockOrderIndex], imageOrder[blockOrderIndex]];
        
        emptyBlockCoords = blockCoords;
        return true;
    }
    return false;
}

function canMoveBlock(block) {
    let blockCoords = block.blockCoords || [Math.floor(Array.from(blocks).indexOf(block) / cols), Array.from(blocks).indexOf(block) % cols];
    
    if (blockCoords[0] < 0 || blockCoords[1] < 0 || blockCoords[0] >= rows || blockCoords[1] >= cols) {
        return false;
    }
    
    if (blockCoords[0] === emptyBlockCoords[0] && Math.abs(blockCoords[1] - emptyBlockCoords[1]) === 1) {
        return true;
    }
    
    if (blockCoords[1] === emptyBlockCoords[1] && Math.abs(blockCoords[0] - emptyBlockCoords[0]) === 1) {
        return true;
    }
    
    return false;
}

function onClickOnBlock(blockIdx) {
    if (moveBlock(blockIdx)) {
        if (checkPuzzleSolved()) {
            document.querySelector('.game-part').style.pointerEvents = 'none';
            const emptyElement = document.querySelector('.empty');
            emptyElement.style.opacity = '1';
            emptyElement.style.animation = 'bounce-in 0.3s ease-in-out';
            
            API.makeGameMove(gameId, shipNo)
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