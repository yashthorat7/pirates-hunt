const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameId = new URLSearchParams(window.location.search).get('id');
let titleName;

let currentGuess = '';
let currentRow = 0;
let previousGuesses = [];
const rows = 6;
const columns = 5;

window.onload = () => {
    if (shipNo) {
        fetch(`https://pirateshuntbackend.onrender.com/api/puzzle/game?gameId=${gameId}&shipNo=${shipNo}`)
        .then(response => response.json())
        .then(data => {
            titleName = data.titleName;
            window.gameData = {
                titleName: data.titleName,
                messages: data.messages
            };
        });
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
        updateGrid();
    }
}

function deleteLetter() {
    if (currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, -1);
        updateGrid();
    }
}

function updateGrid() {
    for (let i = 0; i < columns; i++) {
        const cellIndex = currentRow * columns + i;
        const cell = document.querySelectorAll('.cell')[cellIndex];
        cell.textContent = currentGuess[i] || '';
        cell.classList.remove('absent', 'present', 'correct');
    }
}

function submitGuess() {
    if (currentGuess.length < columns) {
        showErrorMessage("write a 5-letter word");
        return;
    }
    if (previousGuesses.includes(currentGuess)) {
        showErrorMessage("you have already guessed that word");
        return;
    }
    checkWordWin(currentGuess);
}

function checkWordWin(chosenAnswer) {
    fetch(`https://pirateshuntbackend.onrender.com/api/puzzle/move?gameId=${gameId}&shipNo=${shipNo}&userInputs=${JSON.stringify(chosenAnswer)}`)
    .then(response => response.json())
    .then(data => {
        const { verdictArray } = data;
        
        verdictArray.forEach((value, index) => {
            const cell = document.querySelectorAll('.cell')[currentRow * columns + index];
            cell.style.animation = 'reveal 0.6s ease-in-out';
            
            setTimeout(() => {
                if (value === 0) {
                    cell.classList.add('absent');
                } else if (value === 1) {
                    cell.classList.add('present');
                } else if (value === 2) {
                    cell.classList.add('correct');
                }
            }, 300);
        });

        if (data.hasWon) {
            triggerUnlock(data.redirect);
        } else {
            handleIncorrectGuess();
        }
    });
}

function handleIncorrectGuess() {
    previousGuesses.push(currentGuess);
    currentGuess = '';
    currentRow++;

    if (currentRow >= rows) {
        setTimeout(() => {
            showErrorMessage("we are changing the secret word");
            window.location.reload();
        }, 1200);
    }
}

function showErrorMessage(message) {
    navigator.vibrate(400);
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
    messageElement.style.color = "#d32020";
}

function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    const size = Math.random() * 1.5 + 0.5;
    const positionX = Math.random() * 100;
    const fallDuration = Math.random() * 3 + 2;

    snowflake.style.width = `${size}vh`;
    snowflake.style.height = `${size}vh`;
    snowflake.style.left = `${positionX}vw`;
    snowflake.style.top = `-5vh`;
    snowflake.style.transition = `transform ${fallDuration}s linear`;
    
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.style.transform = `translateY(110vh)`;
    }, 10);

    setTimeout(() => {
        snowflake.remove();
    }, fallDuration * 1000);
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