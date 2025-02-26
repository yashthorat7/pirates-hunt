function triggerUnlock() {
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

    fetch(`http://localhost:3000/api/puzzle/move`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            gameId,
            shipNo
        })
    })
    .then(response => response.json())
    .then(data => {
        setTimeout(() => window.location.href = data.redirect, 2000);
    });
}