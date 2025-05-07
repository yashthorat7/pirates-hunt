const gameId = new URLSearchParams(window.location.search).get('id');
const numberButtons = document.querySelectorAll('.dial-button:not(:nth-child(9))');
const submitButton = document.querySelector('.dial-button:nth-child(9)');
let maplink = '';

window.onload = async () => {
    const shipNo = new URLSearchParams(window.location.search).get('ship');
    if (shipNo) {
        const data = await API.getGame(gameId, shipNo);
        window.gameData = {
            titleName: data.titleName
        };

        const shipMark = document.querySelector('.ship-mark');
        if (shipMark) {
            shipMark.textContent = `#${shipNo}`;
        }
    }
};

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentLetter = button.textContent;
        const nextLetter = getNextLetter(currentLetter);
        button.textContent = nextLetter;
        button.style.fontSize = '18vw';
    });
});

function getNextLetter(currentLetter) {
    if (currentLetter === '') return 'A';
    return String.fromCharCode((currentLetter.charCodeAt(0) - 65 + 1) % 8 + 65);
}

function checkWin() {
    const buttons = Array.from(document.querySelectorAll('.dial-button:not(:nth-child(9))'))
        .sort((a, b) => a.className.match(/\d+/) - b.className.match(/\d+/));
    const guessedArray = buttons.map(button => button.textContent.trim());
    
    if (!/^[A-H]+$/.test(guessedArray.join(''))) {
        return false;
    }

    const uniqueElements = new Set(guessedArray);
    if (uniqueElements.size !== guessedArray.length) {
        if (navigator.vibrate) {
            navigator.vibrate(400);
        }
        return false;
    }
    
    API.makeGameMove(gameId, shipNo, JSON.stringify(guessedArray))
        .then(data => {
            if (data.hasWon) {
                if (data.fileUrl) {
                    setTimeout(() => {
                        const image = document.createElement('img');
                        image.classList.add('map-image');
                        image.src = data.fileUrl;
                        document.querySelector('.game-part').appendChild(image);
                    }, 500);
                }
                triggerUnlock(data.redirect);
            }
        });
}

submitButton.addEventListener('click', checkWin);

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });