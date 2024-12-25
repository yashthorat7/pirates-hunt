let gameNo = 0;
let gameName = '';

window.onload = () => {
    const gameId = new URLSearchParams(window.location.search).get('id');
    const shipNo = new URLSearchParams(window.location.search).get('ship');

    fetch(`http://localhost:3000/getGameData?Id=${gameId}`)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('.island-name').textContent = `${data.titleName} ISLAND`;
            gameNo = data.gameNo;
            gameName = data.gameName;
            document.querySelector('.character-image').src = `../assets/${gameName}/character-face2.png`;
            document.querySelector('.ship-code').textContent = `SHIP ${shipNo}`;


            fetch(`http://localhost:3000/setEndTime?gameNo=${gameNo}&shipNo=${shipNo}`);
            fetch(`http://localhost:3000/getOutro?shipNo=${shipNo}&gameNo=${gameNo}`)
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.clue-text').textContent = data.clueLetter;
                    document.querySelector('.base-mark').textContent = `Base ${data.baseMark}`;
                    document.querySelector('.checkpoint-image').src = data.imageUrl;
                });

            fetch(`http://localhost:3000/getOutroDialogues?gameNo=${gameNo}`)
                .then(response => response.json())
                .then(data => document.querySelector('.chat-message').textContent = data);
        });
}



let card = document.getElementById("card");
let startX, currentX, isDragging = false;
let rotationY = 0;
let velocity = 0;
let friction = 0.99;
let minVelocity = 0.3;

function autoRotate() {
    if (!isDragging) {
        velocity *= friction;
        if (Math.abs(velocity) < minVelocity) velocity = minVelocity * (velocity < 0 ? -1 : 1);
        rotationY += velocity;
        card.style.transform = `rotateY(${rotationY}deg)`;
    }
    requestAnimationFrame(autoRotate);
}

window.addEventListener("touchstart", startDrag);
window.addEventListener("touchend", endDrag);
window.addEventListener("touchmove", drag);

function startDrag(event) {
    isDragging = true;
    startX = event.touches[0].pageX;
    card.style.transition = 'none';
}

function endDrag() {
    isDragging = false;
    card.style.transition = 'transform 0.3s ease-out';
}

function drag(event) {
    if (!isDragging) return;

    currentX = event.touches[0].pageX;
    let deltaX = currentX - startX;
    velocity = deltaX / 10;
    rotationY += deltaX / 2;

    card.style.transform = `rotateY(${rotationY}deg)`;
    startX = currentX;
}

function createGlitter() {
    const glitter = document.createElement('div');
    glitter.classList.add('glitter');
    const size = 5 + Math.random() * 15;
    glitter.style.width = `${size * 2}px`;
    glitter.style.height = `${size * 2}px`;
    glitter.style.left = `${Math.random() * window.innerWidth}px`;
    glitter.style.top = `${window.innerHeight}px`;
    glitter.style.animationDuration = `${4 + Math.random() * 6}s`;
    glitter.style.transform = `translateX(${Math.random() * 100 - 50}px)`;
    document.body.appendChild(glitter);

    setTimeout(() => glitter.remove(), 12000);
}

autoRotate();
setInterval(createGlitter, 300);

document.querySelector('.camera-icon').addEventListener('click', function() {
    document.querySelector('.card-back').style.display = 'none';
    const cardFront = document.querySelector('.card-wrapper');
    
    html2canvas(cardFront).then(function(canvas) {
        let link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'itachi-island.png';
        link.click();
    });
    
    document.querySelector('.card-back').style.display = 'flex';
});