(() => {
    const messageElement = document.querySelector('.message');
    const presetMessages = [
        "patience is the key",
        "try using your brains",
        "snap those tiles in place!",
        "try to place the tiles carefully.",
        "you break a tile you will have to restart",
        "if anything happens...just restart",
        "match the tiles on the frames"
    ];

    const shipNo = new URLSearchParams(window.location.search).get('ship');
    const shipMark = document.querySelector('.ship-mark');

    if (shipMark && shipNo) {
        shipMark.textContent = `#${shipNo}`;
        
    }
    function updateMessage() {
        if (messageElement) {
            const index = Math.floor(Math.random() * presetMessages.length);
            const newMessage = presetMessages[index];
            messageElement.textContent = newMessage;
            console.log(newMessage);
        }
    }

    if (messageElement) {
        messageElement.textContent = presetMessages[0];
        setInterval(updateMessage, 12000);
    }
})();
