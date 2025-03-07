(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const shipNo = urlParams.get('ship');

    async function checkForHint() {
        try {
            const response = await fetch(`https://pirateshuntbackend.onrender.com/api/puzzle/hint/getHint?gameId=${gameId}&shipNo=${shipNo}`);
            if (response.status === 204) return null;
            
            const data = await response.json();
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