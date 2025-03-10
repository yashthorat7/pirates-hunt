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

function fetchGameData() {
    fetch(`http://localhost:3000/api/puzzle/game?gameId=${gameId}&shipNo=${shipNo}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.doWait) {
                showTimerOverlay(90);
            } else {
                window.gameData = {
                    titleName: data.titleName,
                    messages: data.messages
                };
                questions = data.questions;
                fileName = data.fileName;
                removeTimerOverlay();
                if (questions && questions.length > 0) {
                    makeOptions();
                }
            }
        });
}

function makeOptions() {
    const questionElement = document.querySelector('.riddle');
    const optionsPart = document.querySelector('.options-part');

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    questionElement.src = `../../assets/goku/${fileName}/riddle (${currentQuestion.riddleNo}).png`;
    optionsPart.innerHTML = '';
    
    const questionNumber = document.querySelector('.question-title');
    questionNumber.textContent = `JUMP STONE ${currentQuestionIndex + 1}`;

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
    const userInput = {
        riddleNo: riddleNo,
        answer: selectedOption
    };

    const response = await fetch(`https://pirateshuntbackend.onrender.com/api/puzzle/move?gameId=${gameId}&shipNo=${shipNo}&userInputs=${JSON.stringify(userInput)}`);
    const data = await response.json();
    
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