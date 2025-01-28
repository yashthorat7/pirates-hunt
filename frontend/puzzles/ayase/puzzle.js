const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameNo = 3;
const gameName = '3-wordGuess';
const gameId = 'wnovs';

let currentQuestionIndex = 0;

window.onload = () => {
    const shipMark = document.querySelector('.ship-mark');
    shipMark.textContent = `#${shipNo}`;
    fetch(`http://localhost:3000/setStartTime?gameNo=${gameNo}&shipNo=${shipNo}`)
    setupQuestion();
};

function setupQuestion() {
    const questionElement = document.querySelector('.riddle');
    const letterBoxesContainer = document.querySelector('.letter-boxes');

    fetch(`http://localhost:3000/getWordQuestion?shipNo=${shipNo}`)
    .then(response => response.json())
    .then(data => {
        const question = data.question;
        questionElement.src = question.riddleNo;

        letterBoxesContainer.innerHTML = '';
        const questionNumber = document.querySelector('.question-title');
        questionNumber.textContent = `WORD ${currentQuestionIndex + 1}`;

        // Create letter boxes based on word length
        const wordLength = question.wordLength;
        for (let i = 0; i < wordLength; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.classList.add('letter-box');
            input.dataset.index = i;
            input.placeholder = '?';
            
            // Auto-focus next input on letter entry and check if word is complete
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                if (e.target.value.length === 1) {
                    const next = input.nextElementSibling;
                    if (next) {
                        next.focus();
                    } else {
                        // If all boxes are filled, check the answer
                        const allBoxes = document.querySelectorAll('.letter-box');
                        const isFull = Array.from(allBoxes).every(box => box.value.length === 1);
                        if (isFull) {
                            checkAnswer();
                        }
                    }
                }
            });
            
            // Handle backspace
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value) {
                    const prev = input.previousElementSibling;
                    if (prev) prev.focus();
                }
            });

            letterBoxesContainer.appendChild(input);
        }
    });
}

function extractRiddleNoFromImageSrc(src) {
    const match = src.match(/riddle%20\((\d{1,2})\)\.png/);
    return parseInt(match[1]);
}

function checkAnswer() {
    const letterBoxes = document.querySelectorAll('.letter-box');
    const answer = Array.from(letterBoxes).map(box => box.value).join('').toUpperCase();
    const questionElement = document.querySelector('.riddle');
    const riddleNo = extractRiddleNoFromImageSrc(questionElement.src);

    fetch(`http://localhost:3000/getWordWin?shipNo=${shipNo}&riddleNo=${riddleNo}&chosenAnswer=${answer}`)
    .then(response => response.json())
    .then(data => {
        const hasWon = data.hasWon;
        
        letterBoxes.forEach(box => {
            box.classList.add(hasWon ? 'correct' : 'incorrect');
            box.disabled = true;
        });

        if (hasWon) {
            setTimeout(() => {
                if (currentQuestionIndex >= 5) {
                    triggerUnlock();
                } else {
                    currentQuestionIndex++;
                    letterBoxes.forEach(box => {
                        box.style.animation = 'slideOut 0.5s ease forwards';
                    });
                    setTimeout(setupQuestion, 600);
                }
            }, 1000);
        } else {
            navigator.vibrate(400);
            setTimeout(() => {
                letterBoxes.forEach(box => {
                    box.classList.remove('incorrect');
                    box.disabled = false;
                    box.value = '';
                });
                letterBoxes[0].focus();
            }, 1000);
        }
    });
}

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;

        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    }); 