let guessedNumbers = new Set();
let isFirstGuess = true;
const gameNo = 9;
const shipNo = new URLSearchParams(window.location.search).get('ship');

window.onload = () => {
    if (shipNo) {
        const shipMark = document.querySelector('.ship-mark');
        shipMark.textContent = `#${shipNo}`;
        fetch(`http://localhost:3000/setStartTime?gameNo=${gameNo}&shipNo=${shipNo}`);
    }
};

function changeNumber(rectId, change) {
    const digitElement = document.getElementById(`digit-${rectId}`);
    const currentValue = parseInt(digitElement.textContent);
    const newValue = (currentValue + change + 10) % 10;
    digitElement.textContent = newValue;
}

function handleGuessClick() {
    const guessedNumber = Array.from({ length: 4 }, (_, i) => document.getElementById(`digit-${i + 1}`).textContent).join('');

    setTimeout(() => {
        if (guessedNumbers.has(guessedNumber)) {
            showErrorMessage("This number was already guessed");
            return;
        }

        if (new Set(guessedNumber).size !== guessedNumber.length) {
            showErrorMessage("No repetition allowed");
            return;
        }

        if (isFirstGuess) {
            document.querySelector('.log-part').innerHTML = '';
            isFirstGuess = false;
        }

        guessedNumbers.add(guessedNumber);
        compareNumbers(guessedNumber);
    }, 100);
}

function compareNumbers(guessedNumber) {
    fetch(`http://localhost:3000/getBullsNCows?shipNo=${shipNo}&guessedNo=${guessedNumber}`)
        .then(response => response.json())
        .then(data => {
            const [guessedNo, bulls, cows] = data.verdictArray;

            if (bulls + cows === 4 && bulls !== 4) {
                showErrorMessage("You found the right numbers... now just rearrange them");
            } else if (bulls === 4) {
                document.querySelector('.game-part').style.userSelect = 'none';
                triggerUnlock();
            }
            logResult(guessedNo, bulls, cows);
        });
}

function logResult(guessedNumber, bulls, cows) {
    const logBox = document.querySelector('.log-part');
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry');
    const guessedNumberEl = document.createElement('span');
    guessedNumberEl.classList.add('guessed-number');
    guessedNumberEl.textContent = guessedNumber;

    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    const bullsEl = document.createElement('p');
    const cowsEl = document.createElement('p');

    if (bulls > 0) {
        bullsEl.innerHTML = `${bulls} right no, right place`;
        bullsEl.style.color = '#6eea54';
    }

    if (cows > 0) {
        cowsEl.innerHTML = `${cows} right no, wrong place`;
        cowsEl.style.color = '#ead656';
    } else if (bulls === 0 && cows === 0) {
        cowsEl.innerHTML = 'No number is correct';
        cowsEl.style.color = '#FF6F91';
    }

    resultContainer.appendChild(bullsEl);
    if (cowsEl.innerHTML !== '') resultContainer.appendChild(cowsEl);

    logEntry.appendChild(guessedNumberEl);
    logEntry.appendChild(resultContainer);
    logBox.appendChild(logEntry);
    logBox.scrollTop = logBox.scrollHeight;
}

function triggerUnlock() {
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 400]);
    }
    confetti({
        particleCount: 100,
        spread: 30,
        startVelocity: 90,
        angle: 90,
        scalar: 1,
        gravity: 5,
        origin: { y: 0.9 },
        tick: 1500
    });
    setTimeout(() => window.location.href = `outro.html?ship=${shipNo}`, 1500);
}

function checkForHint() {
    fetch(`http://localhost:3000/getHint?gameNo=${gameNo}&shipNo=${shipNo}`)
    .then(response => {
        if (response.status === 204) {
            return null;
        } else if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.message && data.link) {
            alert(data.message);
            window.location.href = data.link;
        }
    })
}

function showErrorMessage(message) {
    navigator.vibrate(400);
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
    messageElement.style.color = "#d32020";
}

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;

        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });