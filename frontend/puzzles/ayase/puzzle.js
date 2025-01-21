const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameNo = 5;
const gameName = '5-locks';
const gameId = 'ksdfe';

let lockStates = [0, 0, 0];
const ROTATION_STEP = 45;

window.onload = () => {
    if (shipNo) {
        const shipMark = document.querySelector('.ship-mark');
        if (shipMark) shipMark.textContent = `#${shipNo}`;
        fetch(`http://localhost:3000/setStartTime?gameNo=${gameNo}&shipNo=${shipNo}`);
        setupLocks();
    }
};

function setupLocks() {
    const dials = document.querySelectorAll('.lock-dial');
    dials.forEach((dial, index) => {
        dial.addEventListener('click', () => rotateLock(index));
    });
}

function rotateLock(lockIndex) {
    const lock = document.getElementById(`lock${lockIndex + 1}`);
    const dial = lock.querySelector('.lock-dial');
    
    lockStates[lockIndex] = (lockStates[lockIndex] + ROTATION_STEP) % 360;
    dial.style.transform = `rotate(${lockStates[lockIndex]}deg)`;
    
    checkLockCombination();
}

function checkLockCombination() {
    fetch(`http://localhost:3000/checkLocks?shipNo=${shipNo}&lockStates=${JSON.stringify(lockStates)}`)
    .then(response => response.json())
    .then(data => {
        const { unlockedLocks } = data;
        
        unlockedLocks.forEach((isUnlocked, index) => {
            const lock = document.getElementById(`lock${index + 1}`);
            if (isUnlocked) {
                lock.classList.add('unlocked');
            } else {
                lock.classList.remove('unlocked');
            }
        });

        if (unlockedLocks.every(state => state === true)) {
            setTimeout(() => {
                triggerUnlock();
            }, 1000);
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