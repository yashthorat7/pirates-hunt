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

function updateMessage() {
    const index = Math.floor(Math.random() * presetMessages.length);
    const newMessage = presetMessages[index];
    messageElement.textContent = newMessage;
}

setInterval(updateMessage, 10000);