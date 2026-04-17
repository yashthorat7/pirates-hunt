function getISTTime() {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();
    
    let istHours = utcHours + 5;
    let istMinutes = utcMinutes + 30;
    let istSeconds = utcSeconds;
    
    if (istMinutes >= 60) {
        istHours += 1;
        istMinutes -= 60;
    }
    if (istHours >= 24) {
        istHours -= 24;
    }
    
    return istHours * 3600 + istMinutes * 60 + istSeconds;
}

module.exports = {
    getISTTime
};
