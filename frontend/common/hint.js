(() => {
    function checkForHint() {
        fetch(`http://localhost:3000/getHint?gameNo=${gameNo}&shipNo=${shipNo}`)
        .then(response => {
            if (response.status === 204) {
                return null;
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.message && data.link) {
                alert(data.message);
                window.location.href = data.link;
            }
        })
    }

    setInterval(checkForHint, 20000);
})();