const tiles = document.querySelectorAll('.tile');
const grids = document.querySelectorAll('.grid');
const SNAP_THRESHOLD = 80;
const shipNo = new URLSearchParams(window.location.search).get('ship');
const gameId = new URLSearchParams(window.location.search).get('id');

window.onload = async function () {
    if (shipNo) {
        const data = await API.getGame(gameId, shipNo);
        const tileImages = document.querySelectorAll('.tile img');
        const { fileName } = data;

        tileImages.forEach((img, index) => {
            const tileNumber = index + 1;
            img.src = `../../assets/home/${fileName}/tile (${tileNumber}).png`;
        });

        window.gameData = {
            title: data.title,
            messages: data.messages
        };
    }
};

function getRandomPosition(tileWidth, tileHeight) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const x = Math.random() * (screenWidth - tileWidth);
    const y = Math.random() * (screenHeight - tileHeight - 50);
    return { x, y };
}

function getNearestGrid(tile) {
    let nearestGrid = null;
    let nearestDistance = Infinity;
    const tileRect = tile.getBoundingClientRect();

    grids.forEach(grid => {
        if (grid.getAttribute('data-occupied') === 'true') return;

        const gridRect = grid.getBoundingClientRect();
        const dx = tileRect.left - gridRect.left;
        const dy = tileRect.top - gridRect.top;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < nearestDistance && distance < SNAP_THRESHOLD) {
            nearestDistance = distance;
            nearestGrid = grid;
        }
    });

    return nearestGrid;
}

function checkCompletion() {
    let allOccupied = true;
    let allCorrect = true;

    grids.forEach((grid, index) => {
        const gridOccupied = grid.getAttribute('data-occupied') === 'true';
        allOccupied = allOccupied && gridOccupied;

        const correspondingTile = document.querySelector(`.tile-${index + 1}`);
        const gridRect = grid.getBoundingClientRect();
        const tileRect = correspondingTile.getBoundingClientRect();
        const isCorrectlyPlaced =
            Math.abs(tileRect.left - gridRect.left) < 5 &&
            Math.abs(tileRect.top - gridRect.top) < 5;

        allCorrect = allCorrect && isCorrectlyPlaced;
    });

    if (allOccupied && allCorrect) {
        API.getGameMove(gameId, shipNo)
            .then(data => {
                if (data.hasWon) {
                    triggerUnlock(data.redirect);
                }
            });
    }
}

function checkForLastUnoccupied() {
    const unoccupiedTiles = Array.from(tiles).filter(tile => !tile.parentElement.getAttribute('data-occupied'));
    const unoccupiedGrids = Array.from(grids).filter(grid => grid.getAttribute('data-occupied') !== 'true');

    if (unoccupiedTiles.length === 1 && unoccupiedGrids.length === 1) {
        const lastTile = unoccupiedTiles[0];
        const lastGrid = unoccupiedGrids[0];
        const gridRect = lastGrid.getBoundingClientRect();

        lastTile.style.left = `${gridRect.left}px`;
        lastTile.style.top = `${gridRect.top}px`;

        lastGrid.setAttribute('data-occupied', 'true');
        currentlyOccupiedGrid = lastGrid;
        lastTile.style.zIndex = 5;
    }
}

tiles.forEach(tile => {
    const tileWidth = tile.offsetWidth;
    const tileHeight = tile.offsetHeight;
    const { x, y } = getRandomPosition(tileWidth, tileHeight);
    tile.style.position = 'absolute';
    tile.style.left = `${x}px`;
    tile.style.top = `${y}px`;
});

tiles.forEach(tile => {
    let offsetX, offsetY;
    let currentlyOccupiedGrid = null;

    tile.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        offsetX = touch.clientX - tile.getBoundingClientRect().left;
        offsetY = touch.clientY - tile.getBoundingClientRect().top;

        tile.style.zIndex = 10;

        if (currentlyOccupiedGrid) {
            currentlyOccupiedGrid.setAttribute('data-occupied', 'false');
            currentlyOccupiedGrid = null;
        }
    });

    tile.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        let x = touch.clientX - offsetX;
        let y = touch.clientY - offsetY;

        const tileWidth = tile.offsetWidth;
        const tileHeight = tile.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + tileWidth > screenWidth) x = screenWidth - tileWidth;
        if (y + tileHeight > screenHeight) y = screenHeight - tileHeight;

        tile.style.left = `${x}px`;
        tile.style.top = `${y}px`;
    });

    tile.addEventListener('touchend', () => {
        const nearestGrid = getNearestGrid(tile);

        if (nearestGrid) {
            const gridRect = nearestGrid.getBoundingClientRect();
            tile.style.left = `${gridRect.left}px`;
            tile.style.top = `${gridRect.top}px`;

            nearestGrid.setAttribute('data-occupied', 'true');
            currentlyOccupiedGrid = nearestGrid;
            tile.style.zIndex = 5;

            checkCompletion();
            checkForLastUnoccupied();
        }
    });
});

fetch('../../common/connect.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.connect-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../common/connect.js';
        document.body.appendChild(script);
    });
