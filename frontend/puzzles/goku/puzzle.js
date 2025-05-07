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
}

function makeOptions() {
    const riddles = document.querySelector('.riddle-container');
    riddles.innerHTML = '';
    
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('option-container');

    if (currentQuestionIndex < questions.length) {
        const options = questions[currentQuestionIndex].options;
        options.forEach(option => {
            const optionBox = document.createElement('div');
            optionBox.classList.add('option-box');
            optionBox.textContent = option;
            optionBox.addEventListener('click', () => checkAnswer(option, currentQuestionIndex));
            optionContainer.appendChild(optionBox);
        });
        
        riddles.appendChild(optionContainer);
    }
}

async function checkAnswer(selectedOption, riddleNo) {
    const optionBoxes = document.querySelectorAll('.option-box');
    const userInput = {
        riddleNo: riddleNo,
        answer: selectedOption
    };

    const data = await API.makeGameMove(gameId, shipNo, JSON.stringify(userInput));
    
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
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            setTimeout(() => {
                makeOptions();
            }, 1000);
        } else if (data.redirect) {
            document.querySelector('.game-part').style.userSelect = 'none';
            triggerUnlock(data.redirect);
        }
    } else {
        setTimeout(() => {
            showTimerOverlay(30);
            setTimeout(() => {
                location.reload();
            }, 30000);
        }, 1000);
    }
}

function formatTime(seconds) {
    return `${Math.floor(seconds)}`;
}
  
function showTimerOverlay(duration) {
    const overlay = document.createElement('div');
    overlay.classList.add('timer-overlay');
    
    const timerText = document.createElement('div');
    timerText.classList.add('timer-text');
    timerText.textContent = formatTime(duration);
    
    overlay.appendChild(timerText);
    document.querySelector('.game-part').appendChild(overlay);
    
    let timeLeft = duration;
    const interval = setInterval(() => {
        timeLeft--;
        timerText.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            removeTimerOverlay();
        }
    }, 1000);
}

function removeTimerOverlay() {
    const overlay = document.querySelector('.timer-overlay');
    if (overlay) {
        overlay.remove();
    }
}

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });