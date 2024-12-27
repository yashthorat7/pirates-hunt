const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameNo = 4;
const gameName = '4-stoneJump';
const gameId = 'ncied';

let currentQuestionIndex = 0;

window.onload = () => {
    const shipMark = document.querySelector('.ship-mark');
    shipMark.textContent = `#${shipNo}`;
    fetch(`http://localhost:3000/setStartTime?gameNo=${gameNo}&shipNo=${shipNo}`)
    makeOptions();
};

function makeOptions() {
    const questionElement = document.querySelector('.riddle');
    const optionsPart = document.querySelector('.options-part');

    fetch(`http://localhost:3000/getStoneQuestion?shipNo=${shipNo}`)
    .then(response => response.json())
    .then(data => {
        const question = data.question;
        questionElement.src = question.riddleNo;

        optionsPart.innerHTML = '';
        const questionNumber = document.querySelector('.question-title');
        questionNumber.textContent = `JUMP STONE ${currentQuestionIndex + 1}`;

        question.options.forEach((option, index) => {
            const optionBox = document.createElement('div');
            optionBox.classList.add('option-box');
            optionBox.id = option - (index + 1);
            optionBox.textContent = option;
            optionBox.onclick = () => checkAnswer(option);

            optionBox.style.animation = 'slideIn 0.6s ease forwards';
            optionsPart.appendChild(optionBox);
        });
    });
}

function extractRiddleNoFromImageSrc(src) {
    const match = src.match(/riddle%20\((\d{1,2})\)\.png/);
    return parseInt(match[1]);
}

function checkAnswer(selectedOption) {
    const optionBoxes = document.querySelectorAll('.option-box');
    const questionElement = document.querySelector('.riddle');
    const riddleNo = extractRiddleNoFromImageSrc(questionElement.src);

    fetch(`http://localhost:3000/getStoneWin?shipNo=${shipNo}&riddleNo=${riddleNo}&chosenAnswer=${selectedOption}`)
    .then(response => response.json())
    .then(data => {
        const hasWon = data.hasWon;
        
        optionBoxes.forEach(box => {
            if (hasWon) {
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

        if (hasWon) {
            setTimeout(() => { 
                slideOutOptions(currentQuestionIndex >= 5); 
            }, 600);
        } else {
            navigator.vibrate(400);
            const messageElement = document.querySelector('.message');
            messageElement.textContent = `wrong stone!`;
            messageElement.style.color = "#d32020";
            setTimeout(() => {
                currentQuestionIndex = 0;
                makeOptions();
                updateMessage();
            }, 1200);
        }
    });
}

function slideOutOptions(isLastQuestion) {
    const optionBoxes = document.querySelectorAll('.option-box');

    optionBoxes.forEach(box => {
        if (box.classList.contains('incorrect')) {
            box.style.transform = 'scale(0)';
            box.style.opacity = '0';
        } else {
            box.style.animation = 'slideOut 1s ease forwards';
        }
    });

    setTimeout(() => {
        optionBoxes.forEach(box => box.remove());
        if (isLastQuestion) {
           triggerUnlock();
        } else {
            currentQuestionIndex++;
            makeOptions();
        }
    }, 600);
}

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;

        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });