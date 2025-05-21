const BASE_URL = 'https://pirateshuntapi.vercel.app';


const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

class API {
    static getGame = debounce(async function(gameId, shipNo) {
        const response = await fetch(`${BASE_URL}/puzzle/game?gameId=${gameId}&shipNo=${shipNo}`);
        return response.json();
    }, 300);

    static getIntro = debounce(async function(introId) {
        const response = await fetch(`${BASE_URL}/intro?introId=${introId}`);
        return response.json();
    }, 300);

    static getIntroMove = debounce(async function(introId, shipNo) {
        const response = await fetch(`${BASE_URL}/intro/move?introId=${introId}&shipNo=${shipNo}`);
        return response.json();
    }, 300);

    static makeGameMove = debounce(async function(gameId, shipNo, userInputs = []) {
        const response = await fetch(`${BASE_URL}/puzzle/move?gameId=${gameId}&shipNo=${shipNo}&userInputs=${JSON.stringify(userInputs)}`);
        return response.json();
    }, 300);

    static getOutro = debounce(async function(outroId, shipNo) {
        const response = await fetch(`${BASE_URL}/outro?outroId=${outroId}&shipNo=${shipNo}`);
        return response.json();
    }, 300);

    static checkHint = debounce(async function(gameId, shipNo) {
        const response = await fetch(`${BASE_URL}/puzzle/hint/getHint?gameId=${gameId}&shipNo=${shipNo}`);
        if (response.status === 204) return null;
        return response.json();
    }, 500);
    
    static submitWin = debounce(async function(winId, shipNo) {
        const response = await fetch(`${BASE_URL}/win?winId=${winId}&shipNo=${shipNo}`);
        return response;
    }, 300);
}

window.API = API;