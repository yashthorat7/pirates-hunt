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
    
    setTimeout(() => window.location.href = `../../outro/outro.html?ship=${shipNo}&id=${gameId}`, 1000);
}