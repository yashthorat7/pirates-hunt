const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameId = new URLSearchParams(window.location.search).get('id');
let titleName;

let currentGuess = '';
let currentRow = 0;
let previousGuesses = [];
const rows = 6;
const columns = 5;

window.onload = async () => {
    if (shipNo) {
        const data = await API.getGame(gameId, shipNo);
        titleName = data.titleName;
        window.gameData = {
            titleName: data.titleName,
            messages: data.messages
        };
    }
};

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const keyPressed = key.textContent.trim();
        
        if (key.id === 'delete-button') {
            deleteLetter();
        } else if (key.id === 'enter-button') {
            submitGuess();
        } else {
            addLetter(keyPressed);
        }
    });
});

function addLetter(letter) {
    if (currentGuess.length < columns) {
        currentGuess += letter;
        const cell = document.querySelector(`.row:nth-child(${currentRow + 1}) .cell:nth-child(${currentGuess.length})`);
        cell.textContent = letter;
        cell.classList.add('filled');
    }
}

function deleteLetter() {
    if (currentGuess.length > 0) {
        const cell = document.querySelector(`.row:nth-child(${currentRow + 1}) .cell:nth-child(${currentGuess.length})`);
        cell.textContent = '';
        cell.classList.remove('filled');
        currentGuess = currentGuess.slice(0, -1);
    }
}

function updateGrid() {
    const currentRowElement = document.querySelector(`.row:nth-child(${currentRow + 1})`);
    const cells = currentRowElement.querySelectorAll('.cell');
    
    cells.forEach((cell, index) => {
        cell.textContent = currentGuess[index] || '';
    });
}

function submitGuess() {
    if (currentGuess.length !== columns) {
        showErrorMessage("Not enough letters");
        return;
    }

    if (previousGuesses.includes(currentGuess)) {
        showErrorMessage("Word already tried");
        return;
    }

    previousGuesses.push(currentGuess);
    
    checkWordWin(currentGuess);
}

async function checkWordWin(chosenAnswer) {
    const data = await API.makeGameMove(gameId, shipNo, JSON.stringify({ chosenAnswer }));
    const currentRowElement = document.querySelector(`.row:nth-child(${currentRow + 1})`);
    
    if (data.hasWon) {
        currentRowElement.querySelectorAll('.cell').forEach(cell => {
            cell.classList.add('correct');
        });
        document.querySelector('.game-part').style.userSelect = 'none';
        triggerUnlock(data.redirect);
    } else {
        handleIncorrectGuess();
    }
}

function handleIncorrectGuess() {
    const currentRowElement = document.querySelector(`.row:nth-child(${currentRow + 1})`);
    currentRowElement.querySelectorAll('.cell').forEach(cell => {
        cell.classList.add('incorrect');
    });

    if (currentRow === rows - 1) {
        document.querySelector('.game-part').style.userSelect = 'none';
        showErrorMessage("Game Over!");
        return;
    }

    currentRow++;
    currentGuess = '';
    updateGrid();
}

function showErrorMessage(message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
    messageElement.style.color = "#d32020";
    if (navigator.vibrate) navigator.vibrate(100);
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    document.querySelector('.game-part').appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 10000);
}

setInterval(createSnowflake, 200);

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });