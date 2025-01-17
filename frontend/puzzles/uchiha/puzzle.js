const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameNo = 10;
const buttons = document.querySelectorAll('.dial-button');
let maplink = '';

window.onload = () => {
    if (shipNo && gameNo) {
        const shipMark = document.querySelector('.ship-mark');
        shipMark.textContent = `#${shipNo}`;
        fetch(`http://localhost:3000/setStartTime?gameNo=${gameNo}&shipNo=${shipNo}`);
    }
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const currentLetter = button.textContent;
        const nextLetter = getNextLetter(currentLetter);
        button.textContent = nextLetter;
        button.style.fontSize = '18vw';
        button.style.fontFamily = 'Ancient';
        button.style.color = '#ff0000b4';
        checkWin();
    });
});

function getNextLetter(current) {
    const letters = 'ABCDEFGHI';
    const currentIndex = letters.indexOf(current);
    return currentIndex === -1 || currentIndex === 8 ? 'A' : letters[currentIndex + 1];
}

function checkWin() {
    const buttons = Array.from(document.querySelectorAll('.dial-button'))
        .sort((a, b) => a.className.match(/\d+/) - b.className.match(/\d+/));
    const guessedArray = buttons.map(button => button.textContent.trim()).join('');   
    if (!/^[A-Z]+$/.test(guessedArray)) {
        return false;
    }
    if (new Set(guessedArray).size !== guessedArray.length) {
        return false;
    }
    fetch(`http://localhost:3000/getManuscriptWin?shipNo=${shipNo}&guessedArray=${guessedArray}`)
    .then(response => response.json())
    .then(data => {
        maplink = data.maplink;
        if (data.hasWon) UnlockTrigger();
    })
}

function UnlockTrigger() {
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 400]);
    }
    fetch(`http://localhost:3000/setEndTime?gameNo=${gameNo}&shipNo=${shipNo}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
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

    setTimeout(() => {
        const image = document.createElement('img');
        image.classList.add('map-image');
        image.src = maplink;
        document.querySelector('.game-part').appendChild(image);
    }, 500);
}