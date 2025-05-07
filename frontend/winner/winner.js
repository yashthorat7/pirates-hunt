const winId = new URLSearchParams(window.location.search).get('id');
const GOOGLE_FORM_URL = "https://forms.gle/Awmm1gqKVu5aHKeQ8";
const victoryMessages = [
    "congratulations!",
    "you have found the treasure!",
    "now return back to home island"
];
let typingTimeout;
let currentMessageIndex = 0;

async function handleForwardClick(event) {
    event.preventDefault();
    const inputBox = document.querySelector('.input-box');
    const inputValue = Number(inputBox.value);
    if(!isNaN(inputValue) && inputValue >= 11 && inputValue <= 99) {
        await API.submitWin(winId, inputValue);
        const firstScreen = document.querySelector('.first-screen');
        const chestImage = document.querySelector('.chest-image');
        const titlePart = document.querySelector('.title-part');
        const victoryScreen = document.querySelector('.victory-screen');
        firstScreen.style.display = 'none';
        chestImage.style.display = 'none';
        titlePart.style.display = 'none';
        victoryScreen.style.display = 'flex';
        triggerUnlock();
        startTypingSequence();
    } else {
        if(navigator.vibrate) navigator.vibrate(100);
        if(inputBox) inputBox.value = '';
        alert('Invalid shipNo');
    }
}

function startTypingSequence() {
    currentMessageIndex = 0;
    typeNextMessage();
}

function typeNextMessage() {
    if (currentMessageIndex < victoryMessages.length) {
        typeMessage(victoryMessages[currentMessageIndex], document.querySelector('.message'), () => {
            setTimeout(() => {
                currentMessageIndex++;
                typeNextMessage();
            }, 1000);
        });
    }
}

function typeMessage(message, element, callback) {
    const characters = message.split('');
    let i = 0;
    clearTimeout(typingTimeout);

    function type() {
        if (i < characters.length) {
            element.textContent += characters[i];
            i++;
            typingTimeout = setTimeout(type, 50);
        } else if (callback) {
            callback();
        }
    }

    element.textContent = '';
    type();
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
        tick: 1500,
    });
}

document.querySelector('.enter-button').addEventListener('click', handleForwardClick);
