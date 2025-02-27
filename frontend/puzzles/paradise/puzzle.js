const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameId = new URLSearchParams(window.location.search).get('id');

window.onload = async function() {
    if (shipNo) {
        const shipMarkElement = document.querySelector('.ship-mark');
        if (shipMarkElement) {
            shipMarkElement.textContent = `#${shipNo}`;
        }

        fetch(`http://localhost:3000/api/puzzle/game?gameId=${gameId}&shipNo=${shipNo}`)
        .then(response => response.json())
        .then(data => {
            titleName = data.titleName;
            fetch(`../../assets/paradise/${data.fileName}.json`)
            .then(response => response.json())
            .then(mazeData => {
                createMaze(mazeData.maze);
            });

            window.gameData = {
                titleName: data.titleName,
                messages: data.messages
            };
        });
    }
};

const mazeHeight = 41;
const mazeWidth = 81;
const mazeContainer = document.querySelector(".maze-container");

let mazeCells = [];
let playerRow = 1;
let playerCol = 0;

function createMaze(mazeData) {
    const maze = document.createElement('div');
    maze.classList.add('maze');

    mazeData.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('maze-row');

        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('maze-cell');

            if (cell === 1) {
                cellElement.classList.add('wall');
            } else {
                cellElement.classList.add('path');
                
                const pathBlock = document.createElement('div');
                pathBlock.classList.add('path-block');
                cellElement.appendChild(pathBlock);
                
                if (rowIndex === 1 && colIndex === 0) {
                    const touchCell = document.createElement('div');
                    touchCell.classList.add('touch-cell');
                    const touchImage = document.createElement('img');
                    touchImage.src = '../../assets/paradise/touch.png';
                    touchCell.appendChild(touchImage);
                    cellElement.appendChild(touchCell);

                    const startCell = document.createElement('div');
                    startCell.classList.add('start-cell');
                    const startImage = document.createElement('img');
                    startImage.src = '../../assets/paradise/stickman.png';
                    startImage.alt = 'Start Stickman';
                    startCell.appendChild(startImage);
                    cellElement.appendChild(startCell);
 
                    const pathBlock = cellElement.querySelector('.path-block');
                    if (pathBlock) {
                        pathBlock.style.opacity = 1;
                    }

                    playerRow = rowIndex;
                    playerCol = colIndex;
                    setOpacityForPlayerCell(playerRow, playerCol);
                }

                if (rowIndex === mazeHeight - 2 && colIndex === mazeWidth - 1) {
                    const endCell = document.createElement('div');
                    endCell.classList.add('end-cell');
                    const endImage = document.createElement('img');
                    endImage.src = '../../assets/paradise/card-icon.png';
                    endImage.alt = 'End Icon';
                    endCell.appendChild(endImage);
                    cellElement.appendChild(endCell);
                }
            }
            rowElement.appendChild(cellElement);

            mazeCells.push(cellElement);
        });

        maze.appendChild(rowElement);
    });

    mazeContainer.appendChild(maze);
}

function setOpacityForPlayerCell(newRow, newCol) {
    mazeCells.forEach(cell => {
        const pathBlock = cell.querySelector('.path-block');
        if (pathBlock) {
            pathBlock.style.opacity = 0;
        }
    });

    const newCell = mazeCells[newRow * mazeWidth + newCol];

    if (newCell) {
        const pathBlock = newCell.querySelector('.path-block');
        if (pathBlock) {
            pathBlock.style.opacity = 1;
        }
    }
}

function updatePlayerPosition() {
    const currentCell = mazeCells[playerRow * mazeWidth + playerCol];
    const scrollToX = currentCell.offsetLeft - (mazeContainer.clientWidth / 2);
    const scrollToY = currentCell.offsetTop - (mazeContainer.clientHeight / 2);

    mazeContainer.scrollTo({
        left: scrollToX,
        top: scrollToY,
        behavior: 'smooth'
    });
}

function canMoveTo(row, col) {
    if (row < 0 || row >= mazeHeight || col < 0 || col >= mazeWidth) return false;
    const nextCell = mazeCells[row * mazeWidth + col];
    return nextCell && !nextCell.classList.contains('wall');
}

function checkForWin() {
    const lastRow = mazeHeight - 2;
    const lastCol = mazeWidth - 1;

    if (playerRow === lastRow && playerCol === lastCol) {
        fetch(`http://localhost:3000/api/puzzle/move?gameId=${gameId}&shipNo=${shipNo}`)
        .then(response => response.json())
        .then(data => {
            if (data.hasWon) {
                triggerUnlock(data.redirect);
            }
        });
    }
}

let firstTouch = true;
let touchTimeout;
document.addEventListener('touchstart', function(event) {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    if (firstTouch) {
        const touchCell = document.querySelector('.touch-cell');
        touchCell.style.display = 'none';
        firstTouch = false;
    }

    const playerCell = mazeCells[playerRow * mazeWidth + playerCol]?.getBoundingClientRect();

    const playerX = playerCell.left + playerCell.width / 2;
    const playerY = playerCell.top + playerCell.height / 2;

    const deltaX = touchX - playerX;
    const deltaY = touchY - playerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxDistance = window.innerHeight * 0.30;

    if (distance <= maxDistance) {
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

        let newRow = playerRow;
        let newCol = playerCol;

        if (angle > -45 && angle < 45) {
            newCol = playerCol + 1;
        } else if (angle > 45 && angle < 135) {
            newRow = playerRow + 1;
        } else if (angle > 135 || angle < -135) {
            newCol = playerCol - 1;
        } else if (angle > -135 && angle < -45) {
            newRow = playerRow - 1;
        }

        clearTimeout(touchTimeout);

        touchTimeout = setTimeout(() => {
            if (canMoveTo(newRow, newCol)) {
                setOpacityForPlayerCell(newRow, newCol);
                playerRow = newRow;
                playerCol = newCol;
                updatePlayerPosition();
            }
        }, 100);
        checkForWin();
    }
});

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;

        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });