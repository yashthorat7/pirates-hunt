const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameId = new URLSearchParams(window.location.search).get('id');
let titleName;

window.onload = async function() {
    if (shipNo) {
        const data = await API.getGame(gameId, shipNo);
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
    }
};

const mazeHeight = 41;
const mazeWidth = 81;
const mazeContainer = document.querySelector(".maze-container");

let mazeCells = [];
let playerRow = 1;
let playerCol = 0;

function createMaze(mazeData) {
    for (let i = 0; i < mazeHeight; i++) {
        const row = document.createElement("div");
        row.className = "maze-row";
        const cellsRow = [];
        
        for (let j = 0; j < mazeWidth; j++) {
            const cell = document.createElement("div");
            cell.className = "maze-cell";
            
            if (mazeData[i][j] === "#") {
                cell.classList.add("wall");
            } else if (mazeData[i][j] === ".") {
                cell.classList.add("path");
            } else if (mazeData[i][j] === "S") {
                cell.classList.add("start");
                playerRow = i;
                playerCol = j;
            } else if (mazeData[i][j] === "E") {
                cell.classList.add("end");
            }
            
            row.appendChild(cell);
            cellsRow.push(cell);
        }
        
        mazeContainer.appendChild(row);
        mazeCells.push(cellsRow);
    }
    
    mazeCells[playerRow][playerCol].classList.add("player");
}

function checkWin() {
    const currentCell = mazeCells[playerRow][playerCol];
    if (currentCell.classList.contains("end")) {
        API.makeGameMove(gameId, shipNo)
            .then(data => {
                if (data.hasWon) {
                    triggerUnlock(data.redirect);
                }
            });
    }
}

function movePlayer(newRow, newCol) {
    if (newRow < 0 || newRow >= mazeHeight || newCol < 0 || newCol >= mazeWidth) return false;
    if (mazeCells[newRow][newCol].classList.contains("wall")) return false;

    mazeCells[playerRow][playerCol].classList.remove("player");
    playerRow = newRow;
    playerCol = newCol;
    mazeCells[playerRow][playerCol].classList.add("player");

    checkWin();
    return true;
}

document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const playerCell = mazeCells[playerRow][playerCol];
    const playerRect = playerCell.getBoundingClientRect();
    const cellWidth = playerRect.width;
    const cellCenterX = playerRect.left + cellWidth / 2;
    const touchX = touch.clientX;

    if (touchX < cellCenterX) {
        movePlayer(playerRow, playerCol - 1);
    } else {
        movePlayer(playerRow, playerCol + 1);
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