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
        const response = await fetch(`https://pirateshuntbackend.onrender.com/api/win?winId=${winId}&shipNo=${inputValue}`);
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
function startTypingSequence(){
    currentMessageIndex = 0;
    typeNextMessage();
}
function typeNextMessage(){
    if(currentMessageIndex >= victoryMessages.length){
        setTimeout(() => { window.location.href = GOOGLE_FORM_URL; }, 100);
        return;
    }
    const messageElement = document.querySelector('.typing-message');
    const message = victoryMessages[currentMessageIndex];
    typeMessage(message, messageElement, () => {
        setTimeout(() => {
            messageElement.textContent = '';
            currentMessageIndex++;
            typeNextMessage();
        }, 1500);
    });
}
function typeMessage(message, element, callback){
    clearTimeout(typingTimeout);
    element.textContent = '';
    let index = 0;
    function typing(){
        if(index < message.length){
            element.textContent += message.charAt(index);
            index++;
            typingTimeout = setTimeout(typing, 70);
        } else {
            if(callback) callback();
        }
    }
    typing();
}
function triggerUnlock(){
    if(navigator.vibrate) navigator.vibrate([100,50,400]);
    confetti({
        particleCount: 50,
        spread: 60,
        startVelocity: 50,
        angle: 60,
        colors: ["#FFD700"],
        shapes: ["circle"],
        origin: { x: 0, y: 1 }
    });
    confetti({
        particleCount: 50,
        spread: 60,
        startVelocity: 50,
        angle: 120,
        colors: ["#FFD700"],
        shapes: ["circle"],
        origin: { x: 1, y: 1 }
    });
}

document.querySelector('.enter-button').addEventListener('click', handleForwardClick);
