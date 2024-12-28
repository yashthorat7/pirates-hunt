(() => {
    const messageElement = document.querySelector('.message');
    const shipNo = new URLSearchParams(window.location.search).get('ship');
    const shipMark = document.querySelector('.ship-mark');
    let presetMessages = [];

    if (shipMark && shipNo) {
        const image = document.querySelector('.character-image');
        image.src = `../../assets/${gameName}/avatar.png`;
        shipMark.textContent = `#${shipNo}`;
    }

    (async () => {
        try {
            const response = await fetch(`http://localhost:3000/getConnectDialogues?gameNo=${gameNo}`);
            if (response.ok) {
                presetMessages = await response.json();
                if (messageElement) {
                    messageElement.textContent = presetMessages[0] || "Default message";
                }
                startMessageUpdates();
            } else {
                console.error("Failed to fetch dialogues");
            }
        } catch (error) {
            console.error("Error fetching dialogues:", error);
        }
    })();

    function updateMessage() {
        if (messageElement && presetMessages.length > 0) {
            const index = Math.floor(Math.random() * presetMessages.length);
            const newMessage = presetMessages[index];
            messageElement.textContent = newMessage;
            messageElement.style.color = "#735656";
        }
    }

    function startMessageUpdates() {
        if (messageElement && presetMessages.length > 0) {
            setInterval(updateMessage, 6000);
        }
    }
})();
