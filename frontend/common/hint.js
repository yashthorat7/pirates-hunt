(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const shipNo = urlParams.get('ship');

    async function checkForHint() {
        try {
            const data = await API.checkHint(gameId, shipNo);
            if (data?.message && data?.redirect) {
                alert(data.message);
                window.location.href = data.redirect;
            }
        } catch (error) {
            console.error('Error checking for hint:', error);
        }
    }

    setInterval(checkForHint, 125000);
})();