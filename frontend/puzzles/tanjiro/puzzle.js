let guessedNumbers = new Set();
let isFirstGuess = true;
const gameId = new URLSearchParams(window.location.search).get('id');
const shipNo = new URLSearchParams(window.location.search).get('ship');

window.onload = async () => {
    if (shipNo) {
        const data = await API.getGame(gameId, shipNo);
        window.gameData = {
            titleName: data.titleName,
            messages: data.messages
        };
    }
};

function changeNumber(rectId, change) {
    const rect = document.querySelector(`.rect${rectId}`);
    let currentNum = parseInt(rect.textContent);
    currentNum = (currentNum + change + 10) % 10;
    rect.textContent = currentNum;
}

function handleGuessClick() {
    const rect1 = document.querySelector('.rect1').textContent;
    const rect2 = document.querySelector('.rect2').textContent;
    const rect3 = document.querySelector('.rect3').textContent;
    const rect4 = document.querySelector('.rect4').textContent;
    const guessedNumber = rect1 + rect2 + rect3 + rect4;

    if (guessedNumbers.has(guessedNumber)) {
        showErrorMessage("You've already tried this combination");
        return;
    }

    guessedNumbers.add(guessedNumber);
    compareNumbers(guessedNumber);
}

async function compareNumbers(guessedNumber) {
    const data = await API.makeGameMove(gameId, shipNo, guessedNumber);
    const [guessedNo, bulls, cows] = data.verdictArray;

    if (bulls + cows === 4 && bulls !== 4) {
        showErrorMessage("You found the right numbers... now just rearrange them");
    } else if (data.hasWon) {
        document.querySelector('.game-part').style.userSelect = 'none';
        if (data.redirect) {
            triggerUnlock(data.redirect);
        }
    }
    logResult(guessedNo, bulls, cows);
}

function logResult(guessedNumber, bulls, cows) {
    const resultLogElement = document.querySelector('.result-log');
    const resultElement = document.createElement('div');
    resultElement.classList.add('result-box');
    
    const guessElement = document.createElement('div');
    guessElement.classList.add('guess');
    guessElement.textContent = guessedNumber;
    
    const bullsCowsElement = document.createElement('div');
    bullsCowsElement.classList.add('bulls-cows');
    bullsCowsElement.textContent = `${bulls}B ${cows}C`;
    
    resultElement.appendChild(guessElement);
    resultElement.appendChild(bullsCowsElement);
    resultLogElement.insertBefore(resultElement, resultLogElement.firstChild);
    
    if (isFirstGuess) {
        const headerElement = document.createElement('div');
        headerElement.classList.add('result-box', 'header');
        
        const guessHeaderElement = document.createElement('div');
        guessHeaderElement.classList.add('guess');
        guessHeaderElement.textContent = 'Guess';
        
        const bullsCowsHeaderElement = document.createElement('div');
        bullsCowsHeaderElement.classList.add('bulls-cows');
        bullsCowsHeaderElement.textContent = 'Result';
        
        headerElement.appendChild(guessHeaderElement);
        headerElement.appendChild(bullsCowsHeaderElement);
        resultLogElement.insertBefore(headerElement, resultLogElement.firstChild);
        
        isFirstGuess = false;
    }
}

function showErrorMessage(message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
    messageElement.style.color = "#d32020";
    if (navigator.vibrate) navigator.vibrate(100);
}

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });