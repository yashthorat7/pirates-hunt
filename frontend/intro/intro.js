let messages = [];
let currentMessageIndex = 0;
let typingTimeout;
const visitedMessages = [];
let redirect = null;
let gameData = null;
let rippleInProgress = false;
const introId = new URLSearchParams(window.location.search).get('id');

window.onload = function () {
    initializeGame();

    const container = document.querySelector('.ripple-container');
    setInterval(() => {
        if (!rippleInProgress) {
            createRipple(container);
            setTimeout(() => createRipple(container), Math.random() * 2000 + 1000);
        }
    }, 3000);
};

async function initializeGame() {
    const introId = new URLSearchParams(window.location.search).get('id');
    const data = await API.getIntro(introId);
    gameData = {
        title: data.title,
        messages: data.messages,
    };
    messages = gameData.messages;

    const titleElement = document.querySelector('.title-name');
    titleElement.textContent = gameData.title.toUpperCase();

    const characterImage = document.querySelector('.character-image');
    characterImage.src = `../assets/${gameData.title}/character.png`;

    const islandImage = document.querySelector('.island-image');
    islandImage.src = `../assets/${gameData.title}/island.png`;

    if (introId === 'ylxqtwoba') {
        const body = document.querySelector('body');
        const messages = document.querySelector('.message');
        body.style.background = "linear-gradient(0deg, rgb(5, 40, 65) 0%, rgb(0, 35, 99) 58%, rgb(0, 5, 53) 100%)";
        messages.style.color = "white";
    }
}

document.querySelector('.enter-button').addEventListener('click', handleForwardClick);
document.querySelector('.forward-button').addEventListener('click', handleNextClick);
document.querySelector('.backward-button').addEventListener('click', handleBackwardClick);
document.querySelector('.title-part').addEventListener('click', redirectToNextPage);

function startTypingAnimation(index, typingDelay = 35) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = '';
    typeMessage(messages[index], messageElement, typingDelay);
}

function typeMessage(message, element, delay, fastTyping = false) {
    const characters = message.split('');
    let i = 0;
    clearTimeout(typingTimeout);

    function type() {
        if (i < characters.length) {
            element.textContent += characters[i];
            i++;
            typingTimeout = setTimeout(type, fastTyping ? delay / 2 : delay);
        }
    }
    type();
}

function handleError(error, inputBox = null) {
    console.error('Error:', error);
    if (navigator.vibrate) navigator.vibrate(100);
    if (inputBox) inputBox.value = '';
    alert('Invalid shipNo');
}

async function handleForwardClick(event) {
    event.preventDefault();
    const inputBox = document.querySelector('.input-box');
    const inputValue = Number(inputBox.value);

    if (!isNaN(inputValue) && inputValue >= 11 && inputValue <= 50) {
        try {
            const data = await API.getIntroMove(introId, inputValue);
            console.log('Redirecting to:', data.redirect);
            redirect = data.redirect;

            const firstScreen = document.querySelector('.first-screen');
            const secondScreen = document.querySelector('.second-screen');
            const shipMark = document.querySelector('.ship-mark');

            const shipNo = inputValue;
            shipMark.textContent = `#${inputValue}`;
            firstScreen.style.display = 'none';
            secondScreen.style.display = 'flex';

            visitedMessages.length = messages.length;
            visitedMessages.fill(false);
            currentMessageIndex = 0;
            setTimeout(() => startTypingAnimation(currentMessageIndex), 10);
        } catch (error) {
            handleError(error, inputBox);
        }
    } else {
        handleError('Invalid input', inputBox);
    }
}

async function redirectToNextPage() {
    window.location.href = redirect;
}

function handleNextClick() {
    if (currentMessageIndex < messages.length - 1) {
        currentMessageIndex++;
        console.log('Current message index:', currentMessageIndex);
        startTypingAnimation(currentMessageIndex);
    } else {
        redirectToNextPage();
    }
}

function handleBackwardClick() {
    if (currentMessageIndex > 0) {
        currentMessageIndex--;
        startTypingAnimation(currentMessageIndex, 10);
    }
}

function createRipple(container) {
    if (rippleInProgress) return;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const islandImage = document.querySelector('.island-image');
    const islandRect = islandImage.getBoundingClientRect();
    const islandCenterX = islandRect.left + islandRect.width / 2;
    const islandCenterY = islandRect.top + islandRect.height / 2;

    const size = Math.max(islandRect.width, islandRect.height) * 2.5;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size * 0.6}px`;
    ripple.style.left = `${islandCenterX - size / 2}px`;
    ripple.style.top = `${islandCenterY - size * 0.3}px`;

    container.appendChild(ripple);
    rippleInProgress = true;

    ripple.addEventListener('animationend', () => {
        ripple.remove();
        rippleInProgress = false;
    });
}
