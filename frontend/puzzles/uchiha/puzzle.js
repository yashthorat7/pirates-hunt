const gameId = new URLSearchParams(window.location.search).get('id');
const shipNo = new URLSearchParams(window.location.search).get('ship');
const numberButtons = document.querySelectorAll('.dial-button:not(:nth-child(9))');
const submitButton = document.querySelector('.dial-button:nth-child(9)');
let maplink = '';

window.onload = async () => {
    if (shipNo) {
        const response = await fetch(`http://localhost:3000/api/puzzle/game?gameId=${gameId}&shipNo=${shipNo}`);
        const data = await response.json();
        
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
        button.style.fontFamily = 'Ancient';
        button.style.color = '#ff0000b4';
    });
});

submitButton.addEventListener('click', () => {
    checkWin();
});

function getNextLetter(current) {
    const letters = 'ABCDEFGHI';
    const currentIndex = letters.indexOf(current);
    return currentIndex === -1 ? 'A' : letters[(currentIndex + 1) % letters.length];
}

function checkWin() {
    const buttons = Array.from(document.querySelectorAll('.dial-button:not(:nth-child(9))'))
        .sort((a, b) => a.className.match(/\d+/) - b.className.match(/\d+/));
    const guessedArray = buttons.map(button => button.textContent.trim());
    
    if (!/^[A-I]+$/.test(guessedArray.join(''))) {
        return false;
    }

    const uniqueElements = new Set(guessedArray);
    if (uniqueElements.size !== guessedArray.length) {
        if (navigator.vibrate) {
            navigator.vibrate(400);
        }
        return false;
    }
    
    fetch(`http://localhost:3000/api/puzzle/move?gameId=${gameId}&shipNo=${shipNo}&userInputs=${JSON.stringify(guessedArray)}`)
        .then(response => response.json())
        .then(data => {
            if (data.hasWon) {
                UnlockTrigger();
                if (data.fileName) {
                    setTimeout(() => {
                        const image = document.createElement('img');
                        image.classList.add('map-image');
                        image.src = data.fileName;
                        document.querySelector('.game-part').appendChild(image);
                    }, 500);
                }
            }
        });
}

function UnlockTrigger() {
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
    
    document.querySelectorAll('.dial-button').forEach(button => {
        button.style.animation = 'zoom-out 1s ease-in-out';
        button.style.pointerEvents = 'none';
        setTimeout(() => {
            button.remove();
        }, 960);
    });
}