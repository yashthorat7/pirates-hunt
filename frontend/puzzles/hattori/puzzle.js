const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameId = new URLSearchParams(window.location.search).get('id');
let titleName;

window.onload = async function() {    
    if (shipNo) {
        const data = await API.getGame(gameId, shipNo);
        titleName = data.titleName;
        const { image } = data;
        
        pannellum.viewer('panorama', {
            type: "equirectangular",
            panorama: `../../assets/hattori/${image}.png`,
            autoLoad: true,
            showZoomCtrl: false,
            showFullscreenCtrl: false,
            hfov: 110,
            minHfov: 50,
            maxHfov: 60,
        });

        window.gameData = {
            titleName: data.titleName,
            messages: data.messages
        };
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

    API.makeGameMove(gameId, shipNo, userInputs)
        .then(data => {
            if (data.hasWon) {
                triggerUnlock(data.redirect);
            } else {
                const messageElement = document.querySelector('.message');
                messageElement.textContent = "Something's incorrect.";
                messageElement.style.color = "#d32020";
                navigator.vibrate?.(100);
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