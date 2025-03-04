const instructions = [
    {
        type: 'image',
        content: '../assets/lobby/instruction1.png',
        text: 'Welcome aboard! Get ready for an exciting treasure hunt adventure!, if you find any error, keep that to yourself and also try to fix it yourself..grow up'
    },
    {
        type: 'emoji',
        content: '🗺️',
        text: 'Follow the clues and solve puzzles to find the hidden treasure.'
    },
    {
        type: 'emoji',
        content: '👥',
        text: 'Work together with your crew to overcome challenges.'
    },
    {
        type: 'image',
        content: '../assets/lobby/instruction4.png',
        text: 'The fastest team to find the treasure wins!'
    }
];

const firstScreen = document.querySelector('.first-screen');
const secondScreen = document.querySelector('.second-screen');
const thirdScreen = document.querySelector('.third-screen');
const message = document.getElementById('animated-message');
const chatbox = document.querySelector('.chatbox');
const dotsContainer = document.querySelector('.dots-container');

function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

let currentIndex = 0;

function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    let windowStart = 0;
    if (currentIndex <= 1) {
        windowStart = 0;
    } else if (currentIndex >= instructions.length - 2) {
        windowStart = instructions.length - 3;
    } else {
        windowStart = currentIndex - 1;
    }
    dots.forEach((dot, i) => {
        dot.className = 'dot';
        const instructionIndex = windowStart + i;
        if (instructionIndex === currentIndex) {
            dot.classList.add('active');
        } else if (instructionIndex < currentIndex) {
            dot.classList.add('before');
        } else {
            dot.classList.add('after');
        }
    });
}

const imageContainer = document.createElement('div');
imageContainer.className = 'instruction-image';
chatbox.insertBefore(imageContainer, message);

function updateInstruction() {
    const instruction = instructions[currentIndex];
    
    imageContainer.innerHTML = '';
    
    if (instruction.type === 'image') {
        const img = document.createElement('img');
        img.src = instruction.content;
        img.onerror = () => {
            img.style.display = 'none';
            imageContainer.style.background = 'rgba(255, 255, 255, 0.1)';
        };
        img.onload = () => {
            img.style.display = 'block';
            imageContainer.style.background = 'none';
        };
        imageContainer.appendChild(img);
    } else {
        const emoji = document.createElement('div');
        emoji.className = 'instruction-emoji';
        emoji.textContent = instruction.content;
        imageContainer.appendChild(emoji);
    }
    
    message.style.opacity = '0';
    message.textContent = instruction.text;
    setTimeout(() => message.style.opacity = '1', 50);
    
    updateDots();
}

function showScreen(screen) {
    [firstScreen, secondScreen, thirdScreen].forEach(s => {
        if (s === screen) {
            s.style.display = 'flex';
            s.style.opacity = '0';
            setTimeout(() => s.style.opacity = '1', 50);
        } else {
            s.style.opacity = '0';
            setTimeout(() => s.style.display = 'none', 300);
        }
    });
}

document.querySelector('.lobby-button').addEventListener('click', () => {
    showScreen(secondScreen);
    updateInstruction();
    changeBackground();
});

document.querySelector('.whatsapp-button').addEventListener('click', () => {
    window.location.href = 'https://web.whatsapp.com';
    changeBackground();
});

const backgrounds = [
    "linear-gradient(120deg, #ff9a9e, #fad0c4)", 
    "linear-gradient(120deg, #a1c4fd, #c2e9fb)", 
    "linear-gradient(120deg, #fbc2eb, #a6c1ee)", 
    "linear-gradient(120deg, #ffecd2, #fcb69f)"
];

function changeBackground() {
    document.body.style.background = backgrounds[currentIndex % backgrounds.length];
}

document.querySelector('.forward-button').addEventListener('click', () => {
    if (currentIndex < instructions.length - 1) {
        currentIndex++;
        updateInstruction();
    } else {
        showScreen(thirdScreen);
    }
    changeBackground();
});

document.querySelector('.backward-button').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateInstruction();
    } else {
        showScreen(firstScreen);
    }
    changeBackground();
});

document.querySelector('.backward2-button').addEventListener('click', () => {
    showScreen(secondScreen);
    currentIndex = instructions.length - 1;
    updateInstruction();
    changeBackground();
});

document.querySelector('.start-button').addEventListener('click', () => {
    const password = document.querySelector('.password-input').value;
    if (password.length != 7) {
        alert('wait till we give u the password');
        return;
    }
    fetch(`/api/lobby?password=${password}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                alert('wait...we will give u the password');
            }
        });
});

createDots();
