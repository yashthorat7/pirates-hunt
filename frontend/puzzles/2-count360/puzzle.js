const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameNo = 2;
const gameName = '2-count360';
const gameId = 'dysde';

window.onload = function() {    
    if (shipNo) {
        fetch(`http://localhost:3000/get360Image?shipNo=${shipNo}&gameNo=${gameNo}`)
        .then(response => response.json())
        .then(data => {
            const image360Link = data.link;
            if (image360Link) {
                pannellum.viewer('panorama', {
                    type: "equirectangular",
                    panorama: image360Link,
                    autoLoad: true,
                    showZoomCtrl: false,
                    showFullscreenCtrl: false,
                    hfov: 110,
                    minHfov: 50,
                    maxHfov: 60,
                });
            }
        });
        fetch(`http://localhost:3000/setStartTime?gameNo=${gameNo}&shipNo=${shipNo}`);
    }
};

function handleCounterClick() {
    setTimeout(() => {
    document.querySelector('.first-screen').style.display = 'flex';
    document.querySelector('.second-screen').style.display = 'none';
    }, 100);
}

function handleDiveClick() {
    setTimeout(() => {
        document.querySelector('.second-screen').style.display = 'flex';
        document.querySelector('.first-screen').style.display = 'none';
    }, 100);
}

function adjustCounter(counterId, adjustment) {
    const counterValueElement = document.querySelector(`.counter-box:nth-child(${counterId}) .number-box span`);
    let currentValue = parseInt(counterValueElement.textContent, 10);
    currentValue = (currentValue + adjustment + 21) % 21;
    counterValueElement.textContent = currentValue;
}

function handleVerificationClick() {
    const userInputs = [
        parseInt(document.querySelector('.counter-box:nth-child(1) .number-box span').textContent),
        parseInt(document.querySelector('.counter-box:nth-child(2) .number-box span').textContent),
        parseInt(document.querySelector('.counter-box:nth-child(3) .number-box span').textContent),
        parseInt(document.querySelector('.counter-box:nth-child(4) .number-box span').textContent)
    ];

    fetch(`http://localhost:3000/get360Win?shipNo=${shipNo}&userInputs=${JSON.stringify(userInputs)}`)
    .then(response => response.json())
    .then(data => {
        if (data.hasWon) {
            triggerUnlock();
        } else {
            const messages = [
                "Not your day mate...",
                "Nope, try again.",
                "Something's incorrect."
            ];
            const messageElement = document.querySelector('.message');
            messageElement.textContent = messages[Math.floor(Math.random() * messages.length)];
            messageElement.style.color = "#d32020";
            navigator.vibrate && navigator.vibrate(100);
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