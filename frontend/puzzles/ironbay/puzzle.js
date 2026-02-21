shipNo = new URLSearchParams(window.location.search).get('ship');
gameId = new URLSearchParams(window.location.search).get('id');
let currentQuestionIndex = 0;
let questions = [];
let fileName = '';

document.addEventListener('DOMContentLoaded', () => {
    if (shipNo) {
        fetchGameData();
    }
});

async function fetchGameData() {
    const data = await API.getGame(gameId, shipNo);
    if (data.doWait) {
        showTimerOverlay(30);
    } else {
        window.gameData = {
            title: data.title,
            messages: data.messages
        };
        questions = data.questions;
        fileName = data.fileName;
        removeTimerOverlay();
        if (questions && questions.length > 0) {
            makeOptions();
        }
    }
}

function makeOptions() {
    const questionElement = document.querySelector('.riddle');
    const optionsPart = document.querySelector('.options-part');

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    questionElement.src = `../../assets/ironbay/${fileName}/riddle (${currentQuestion.riddleNo}).png`;
    optionsPart.innerHTML = '';

    const questionNumber = document.querySelector('.question-title');
    questionNumber.textContent = `JUMP STONE ${currentQuestionIndex + 1}`;

    const nextQuestion = questions[currentQuestionIndex + 1];
    if (nextQuestion) {
        const preloadedImage = new Image();
        preloadedImage.src = `../../assets/ironbay/${fileName}/riddle (${nextQuestion.riddleNo}).png`;
    }

    currentQuestion.options.forEach((option, index) => {
        const optionBox = document.createElement('div');
        optionBox.classList.add('option-box');
        optionBox.id = option - (index + 1);
        optionBox.textContent = option;
        optionBox.onclick = () => checkAnswer(option, currentQuestion.riddleNo);
        optionBox.style.animation = 'slideIn 0.6s ease forwards';
        optionsPart.appendChild(optionBox);
    });
}

async function checkAnswer(selectedOption, riddleNo) {
    const optionBoxes = document.querySelectorAll('.option-box');
    const userInputs = [riddleNo, selectedOption];

    const data = await API.getGameMove(gameId, shipNo, JSON.stringify(userInputs));

    optionBoxes.forEach(box => {
        if (data.isCorrect) {
            if (box.textContent === selectedOption) {
                box.classList.add('correct');
            } else {
                box.classList.add('incorrect');
                box.style.animation = 'shrink 0.6s ease forwards';
                box.addEventListener('animationend', () => {
                    box.style.opacity = 0;
                }, { once: true });
            }
        } else {
            box.classList.add('incorrect');
            box.style.animation = 'shrink 0.6s ease forwards';
            box.addEventListener('animationend', () => {
                box.style.opacity = 0;
            }, { once: true });
        }
    });

    if (data.isCorrect) {
        setTimeout(() => {
            if (data.hasWon) {
                triggerUnlock(data.redirect);
            } else {
                currentQuestionIndex++;
                makeOptions();
            }
        }, 600);
    } else {
        navigator.vibrate(400);
        const messageElement = document.querySelector('.message');
        messageElement.textContent = `wrong stone!`;
        messageElement.style.color = "#d32020";
        setTimeout(() => {
            window.location.reload();
        }, 1200);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
}

function showTimerOverlay(duration) {
    const overlay = document.querySelector('.wait-overlay');
    const timerElement = document.querySelector('.timer');
    overlay.style.display = 'flex';
    timerElement.textContent = formatTime(duration);
    const interval = setInterval(() => {
        duration--;
        timerElement.textContent = formatTime(duration);
        if (duration <= 0) {
            clearInterval(interval);
            removeTimerOverlay();
            fetchGameData();
        }
    }, 1000);
}

function removeTimerOverlay() {
    const overlay = document.querySelector('.wait-overlay');
    overlay.style.display = 'none';
}

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });