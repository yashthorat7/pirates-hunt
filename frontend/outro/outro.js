window.onload = async () => {
    const outroId = new URLSearchParams(window.location.search).get('id');
    const shipNo = new URLSearchParams(window.location.search).get('ship');

    const data = await API.getOutro(outroId, shipNo);
    document.querySelector('.island-name').textContent = `${data.titleName.toUpperCase()} ISLAND`;
    document.querySelector('.character-image').src = `../assets/images/card-avatar.png`;
    document.querySelector('.ship-code').textContent = `SHIP ${shipNo}`;
    document.querySelector('.clue-text').textContent = data.clueLetter;
    document.querySelector('.base-mark').textContent = `Base ${data.baseMark}`;
    document.querySelector('.chat-message').textContent = data.message;
    document.querySelector('.checkpoint-image').src = `${data.fileUrl}`;
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

window.addEventListener("touchstart", startDrag);
window.addEventListener("touchend", endDrag);
window.addEventListener("touchmove", drag);

autoRotate();

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