let remainingCount;
let clickCounter = 0;
let randomNum;
let isLost = false;
let maxLives;
const gameId = new URLSearchParams(window.location.search).get('id');
const shipNo = new URLSearchParams(window.location.search).get('ship');

window.onload = async function () {
    const data = await API.getGame(gameId, shipNo);
    maxLives = data.lives;
    remainingCount = maxLives;

    window.gameData = {
        title: data.title,
        messages: data.messages
    };

    updateProgressBar();
};

async function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressMessage = document.querySelector('.progress-message');

    const percentage = (clickCounter / maxLives) * 100;
    progressFill.style.width = `${percentage}%`;
    progressMessage.textContent = `${Math.round(percentage)}%`;

    if (clickCounter >= maxLives) {
        const data = await API.getGameMove(gameId, shipNo, remainingCount);
        if (data.hasWon) {
            document.querySelector('.game-part').style.pointerEvents = 'none';
            if (data.redirect) {
                triggerUnlock(data.redirect);
            }
        }
    }
}

function updateGhostDisplay(randomNum) {
    randomNum = Math.floor(Math.random() * 4)

    if (randomNum < 3) {
        document.querySelector('.ghost.open').style.display = 'none';
        document.querySelector('.ghost.close').style.display = 'flex';
    } else {
        document.querySelector('.ghost.close').style.display = 'none';
        document.querySelector('.ghost.open').style.display = 'flex';
    }
}

function handleStopping() {
    updateGhostDisplay(randomNum);
}

function handleMoving() {
    if (document.querySelector('.ghost.open').style.display === 'flex') {
        if (navigator.vibrate) {
            navigator.vibrate(600);
        }
        document.querySelector('.ghost.close').style.display = 'none';
        document.querySelector('.ghost.open').style.display = 'none';
        document.querySelector('.ghost.eat').style.display = 'flex';

        document.querySelector('.game-part').style.pointerEvents = 'none';
        setTimeout(() => location.reload(), 300);
        isLost = true;
        return;
    }

    if (!isLost) {
        clickCounter++;
        remainingCount--;
        updateProgressBar();
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill >= 100) {
            document.querySelector('.game-part').style.pointerEvents = 'none';
            triggerUnlock();
        } else {
            updateGhostDisplay(randomNum);
        }
    }
}

function generateRandomEyes() {
    const eyeContainer = document.querySelector('.eye-container');
    if (!eyeContainer) return;

    const eyePair = document.createElement('div');
    eyePair.classList.add('eye-pair');

    const leftEye = document.createElement('div');
    leftEye.classList.add('eye');
    const rightEye = document.createElement('div');
    rightEye.classList.add('eye');

    eyePair.appendChild(leftEye);
    eyePair.appendChild(rightEye);

    const randomTop = Math.random() * 30;
    const randomLeft = Math.random() * 90;
    const randomScale = Math.random() * 0.5 + 0.7;

    eyePair.style.top = `${randomTop}vh`;
    eyePair.style.left = `${randomLeft}vw`;
    eyePair.style.scale = randomScale;

    eyeContainer.appendChild(eyePair);

    const lifespan = (Math.random() * 2 + 4) * 1000;

    setTimeout(() => {
        eyePair.style.animation = 'eyeDisappear 0.5s ease-in forwards';
        setTimeout(() => {
            eyePair.remove();
        }, 600);
    }, lifespan);
}

function generateMultipleEyes() {
    for (let i = 0; i < 6; i++) {
        setTimeout(generateRandomEyes, Math.random() * 2000);
    }
}

setInterval(generateMultipleEyes, 6000);

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });