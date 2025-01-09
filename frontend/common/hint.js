(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameNo = urlParams.get('gameNo');
    const shipNo = urlParams.get('ship');

    async function checkForHint() {
        if (!gameNo || !shipNo) {
            console.error('Missing gameNo or shipNo parameters');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/getHint?gameNo=${gameNo}&shipNo=${shipNo}`);
            if (response.status === 204) {
                return null;
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data?.message && data?.link) {
                alert(data.message);
                window.location.href = data.link;
            }
        } catch (error) {
            console.error('Error checking for hint:', error);
        }
    }

    setInterval(checkForHint, 60050);
})();