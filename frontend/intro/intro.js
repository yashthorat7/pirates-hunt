let messages = [];
let currentMessageIndex = 0;
let typingTimeout;
const visitedMessages = [];
let gameData = null;
let rippleInProgress = false;

function startTypingAnimation(index, typingDelay = 35) {
    const messageElement = document.getElementById('animated-message');
    const backwardButton = document.querySelector('.backward-button');
    const fastTyping = visitedMessages[index] && index !== 0;

    visitedMessages[index] = true;
    typeMessage(messages[index], messageElement, typingDelay, fastTyping);
    backwardButton.style.display = currentMessageIndex === 0 ? 'none' : 'block';
}

function typeMessage(message, element, delay, fastTyping = false) {
    clearTimeout(typingTimeout);
    element.textContent = '';
    let index = 0;

    const forwardButton = document.querySelector('.forward-button');
    forwardButton.disabled = true;

    if (fastTyping) delay = 5;

    function typing() {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
            typingTimeout = setTimeout(typing, delay);
        } else {
            forwardButton.disabled = false;
        }
    }
    typing();
}

async function handleForwardClick(event) {
    event.preventDefault();
    const inputBox = document.querySelector('.input-box');
    const inputValue = Number(inputBox.value);

    if (!isNaN(inputValue) && inputValue >= 11 && inputValue <= 50) {
        try {
            const firstScreen = document.querySelector('.first-screen');
            const secondScreen = document.querySelector('.second-screen');
            const shipMark = document.querySelector('.ship-mark');
            
            shipMark.textContent = `#${inputValue}`;
            firstScreen.style.display = 'none';
            secondScreen.style.display = 'flex';

            visitedMessages.length = messages.length;
            visitedMessages.fill(false);
            currentMessageIndex = 0;
            setTimeout(() => startTypingAnimation(currentMessageIndex), 10);

        } catch (error) {
            console.error('Error:', error);
            if (navigator.vibrate) navigator.vibrate(100);
        }
    } else {
        if (navigator.vibrate) navigator.vibrate(100);
        inputBox.value = '';
    }
}

function handleNextClick() {
    if (currentMessageIndex < messages.length - 1) {
        currentMessageIndex++;
        startTypingAnimation(currentMessageIndex);
    } else {
        window.location.href = gameData.redirectLink;
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

async function initializeGame() {
    const gameId = new URLSearchParams(window.location.search).get('id');
    try {
        const response = await fetch(`http://localhost:3000/getGameData?id=${gameId}`);
        if (!response.ok) throw new Error('Failed to fetch game data');
        
        const data = await response.json();
        gameData = {
            gameName: data.gameName,
            titleName: data.titleName,
            redirectLink: data.redirectLink
        };
        messages = data.messages;

        const titleElement = document.querySelector('.title-name');
        titleElement.textContent = gameData.titleName;
        
        const characterImage = document.querySelector('.character-image');
        characterImage.src = `../assets/${gameData.gameName}/character.png`;
        
        const islandImage = document.querySelector('.island-image');
        islandImage.src = `../assets/${gameData.gameName}/island.png`;
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}

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

document.querySelector('.enter-button').addEventListener('click', handleForwardClick);
document.querySelector('.forward-button').addEventListener('click', handleNextClick);
document.querySelector('.backward-button').addEventListener('click', handleBackwardClick);
