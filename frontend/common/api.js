const BASE_URL = 'https://pirateshuntbackend.onrender.com/api';


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
    static async getGame(gameId, shipNo) {
        const response = await fetch(`${BASE_URL}/puzzle/game?gameId=${gameId}&shipNo=${shipNo}`);
        return response.json();
    }

    static async getIntro(introId) {
        const response = await fetch(`${BASE_URL}/intro?introId=${introId}`);
        return response.json();
    }

    static async getIntroMove(introId, shipNo) {
        const response = await fetch(`${BASE_URL}/intro/move?introId=${introId}&shipNo=${shipNo}`);
        return response.json();
    }

    static makeGameMove = debounce(async function(gameId, shipNo, userInputs = []) {
        const response = await fetch(`${BASE_URL}/puzzle/move?gameId=${gameId}&shipNo=${shipNo}&userInputs=${JSON.stringify(userInputs)}`);
        return response.json();
    }, 300);

    static async getOutro(outroId, shipNo) {
        const response = await fetch(`${BASE_URL}/outro?outroId=${outroId}&shipNo=${shipNo}`);
        return response.json();
    }

    static checkHint = debounce(async function(gameId, shipNo) {
        const response = await fetch(`${BASE_URL}/puzzle/hint/getHint?gameId=${gameId}&shipNo=${shipNo}`);
        if (response.status === 204) return null;
        return response.json();
    }, 500);
    
    static async submitWin(winId, shipNo) {
        const response = await fetch(`${BASE_URL}/win?winId=${winId}&shipNo=${shipNo}`);
        return response;
    }
}

window.API = API;