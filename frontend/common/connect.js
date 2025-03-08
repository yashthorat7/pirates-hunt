(() => {
    const messageElement = document.querySelector('.message');
    const urlParams = new URLSearchParams(window.location.search);
    const shipNo = urlParams.get('ship');
    const gameId = urlParams.get('id');
    const shipMark = document.querySelector('.ship-mark');

    if (shipMark && shipNo) {
        shipMark.textContent = `#${shipNo}`;
    }

    const checkGameData = setInterval(() => {
        if (window.gameData) {
            const image = document.querySelector('.character-image');
            image.src = `../../assets/${window.gameData.titleName}/character.png`;
            
            if (messageElement && window.gameData.messages) {
                messageElement.textContent = window.gameData.messages[0];
                startMessageUpdates(window.gameData.messages);
            }
            clearInterval(checkGameData);
        }
    }, 100);

    function startMessageUpdates(messages) {
        setInterval(() => {
            if (messageElement && messages.length > 0) {
                const index = Math.floor(Math.random() * messages.length);
                messageElement.textContent = messages[index];
                messageElement.style.color = "#735656";
            }
        }, 6000);
    }
})();
