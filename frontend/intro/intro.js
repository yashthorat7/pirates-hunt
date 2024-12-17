
const messages = [
    "Welcome to the itachi island..land of the greatest mathematician itachi",
    "all we know is...when he died, he put the treasure piece in the unbreakable box",
    "you can only open the box with a 4 digit secret code with non repeating digits",
    "don't worry, you will get infinite guesses and hints with each guess",
];
let currentMessageIndex = 0;
let typingTimeout;
const visitedMessages = Array(messages.length).fill(false);
const gameNo = 7;
let isRegistered = false;

function handleForwardClick() {
    setTimeout(() => {
        const firstScreen = document.querySelector('.first-screen');
        const secondScreen = document.querySelector('.second-screen');
        const titleText = document.querySelector('.title-text');
        const inputBox = document.querySelector('.input-box');
        const shipMark = document.querySelector('.ship-mark');
        const inputValue = Number(inputBox.value);

        if (!isNaN(inputValue) && inputValue > 10 && inputValue <= 50) {
            shipMark.textContent = `#${inputValue}`;
            firstScreen.style.display = 'none';
            secondScreen.style.display = 'flex';
            titleText.style.animation = 'none';
            setTimeout(() => startTypingAnimation(currentMessageIndex), 0);

            fetch(`http://localhost:3000/setBeginTime?gameNo=${gameNo}&shipNo=${inputValue}`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            isRegistered = true;
        } else {
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
            inputBox.value = '';
        }
    }, 100);
}

function typeMessage(message, element, delay, fastTyping = false) {
    clearTimeout(typingTimeout);
    element.textContent = '';
    let index = 0;

    const forwardButton = document.querySelector('.forward-button');  
    forwardButton.disabled = true;

    if (fastTyping) {
        delay = 5;
    }

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

function startTypingAnimation(index, typingDelay = 35) {
    const messageElement = document.getElementById('animated-message');
    const backwardButton = document.querySelector('.backward-button');

    const fastTyping = visitedMessages[index];
    visitedMessages[index] = true;
    typeMessage(messages[index], messageElement, typingDelay, fastTyping);
    backwardButton.style.display = currentMessageIndex === 0 ? 'none' : 'block';
}

function handleNextClick() {
    setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
            currentMessageIndex++;
            startTypingAnimation(currentMessageIndex);
        } else {
            const inputBox = document.querySelector('.input-box');
            const inputValue = Number(inputBox.value);
            window.location.href = `puzzle.html?ship=${inputValue}`;
        }
    }, 100);
}

function handleBackwardClick() {
    setTimeout(() => {
        if (currentMessageIndex > 0) {
            currentMessageIndex--;
            startTypingAnimation(currentMessageIndex, 10);
        }
    }, 100);
}

function createRipple(container) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    
    const islandImage = document.querySelector('.island-image');
    const islandRect = islandImage.getBoundingClientRect();
    const islandCenterX = islandRect.left + islandRect.width / 2;
    const islandCenterY = islandRect.top + islandRect.height / 2;
    
    const size = Math.max(islandRect.width, islandRect.height) * 2.5;
    ripple.style.width = `${size}px`;
    const heightRatio = 0.6;
    ripple.style.height = `${size * heightRatio}px`;
    
    ripple.style.left = `${islandCenterX - size / 2}px`;
    ripple.style.top = `${islandCenterY - (size * heightRatio) / 2}px`;

    container.appendChild(ripple);
    rippleInProgress = true;
    
    ripple.addEventListener("animationend", () => {
        ripple.remove();
        rippleInProgress = false;
    });
}


let rippleInProgress = false;

window.onload = function() {
    const container = document.querySelector('.ripple-container');
    setInterval(() => {
        if (!rippleInProgress) {
            createRipple(container);
            setTimeout(() => createRipple(container), Math.random() * 2000 + 1000);
        }
    }, 3000);
};

const titleText = document.querySelector('.title-text');
titleText.addEventListener('click', () => {
    if (isRegistered) {
        const inputBox = document.querySelector('.input-box');
        const inputValue = Number(inputBox.value);
        window.location.href = `../puzzles/puzzle.html?ship=${inputValue}`;
    }
});