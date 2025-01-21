const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameNo = 5;
const gameName = '5-dalgona';
const gameId = 'ksdfe';

let canvas, ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let pathPoints = [];
let isBroken = false;

const SHAPE_MARGIN = window.innerWidth * 0.1;
const LINE_WIDTH = window.innerWidth * 0.03;
const BREAK_THRESHOLD = window.innerWidth * 0.04;

window.onload = () => {
    if (shipNo) {
        const shipMark = document.querySelector('.ship-mark');
        if (shipMark) shipMark.textContent = `#${shipNo}`;
        fetch(`http://localhost:3000/setStartTime?gameNo=${gameNo}&shipNo=${shipNo}`);
        setupCanvas();
    }
};

function setupCanvas() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Set actual canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    drawDalgona();
    setupEventListeners();
}

function drawDalgona() {
    ctx.fillStyle = '#f4d4aa';
    
    
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, Math.PI * 2);
    ctx.fill();
    
    const umbrellaImg = new Image();
    umbrellaImg.src = '../../assets/5-dalgona/umbrella.svg';
    umbrellaImg.onload = () => {
        const scale = (canvas.width * 0.6) / 100;
        ctx.save();
        ctx.translate(
            canvas.width * 0.2,
            canvas.height * 0.2
        );
        ctx.scale(scale, scale);
        ctx.drawImage(umbrellaImg, 0, 0);
        ctx.restore();
    };
}

function setupEventListeners() {
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    canvas.addEventListener('touchmove', handleTouch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (e.type === 'touchstart') {
        isDrawing = true;
        [lastX, lastY] = [x, y];
        pathPoints = [[lastX, lastY]];
    } else if (e.type === 'touchmove' && isDrawing) {
        draw(x, y);
    }
}

function draw(x, y) {
    if (!isDrawing || isBroken) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#8b7355';
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = 'round';
    ctx.stroke();

    if (isOutsideShape(x, y)) {
        breakCookie();
        return;
    }

    pathPoints.push([x, y]);
    [lastX, lastY] = [x, y];
    
    checkCompletion();
}

function isOutsideShape(x, y) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width * 0.425;
    
    const distanceFromCenter = Math.hypot(x - centerX, y - centerY);
    if (distanceFromCenter > radius) return true;
    
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const isEmpty = pixel[3] < 20;
    return isEmpty;
}

function breakCookie() {
    isBroken = true;
    canvas.classList.add('broken');
    navigator.vibrate && navigator.vibrate(400);
    
    setTimeout(() => {
        location.reload();
    }, 1000);
}

function checkCompletion() {
    if (pathPoints.length > 100) {
        const firstPoint = pathPoints[0];
        const lastPoint = pathPoints[pathPoints.length - 1];
        const distance = Math.hypot(lastPoint[0] - firstPoint[0], lastPoint[1] - firstPoint[1]);
        
        if (distance < LINE_WIDTH) {
            triggerUnlock();
        }
    }
}

function stopDrawing() {
    isDrawing = false;
}

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    }); 