// const BACKEND = "http://localhost:3000";
const BACKEND = "https://pirateshunt.onrender.com";

const debounce = (func, wait) => {
  let timeout;
  let pendingPromise;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    if (pendingPromise) clearTimeout(pendingPromise.timeout);

    return new Promise((resolve) => {
      timeout = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, wait);

      pendingPromise = { timeout, resolve };
    });
  };
};

class API {
  static getIntro = debounce(async function (introId) {
    const response = await fetch(`${BACKEND}/intro?introId=${introId}`);
    return response.json();
  }, 300);

  static getIntroMove = debounce(async function (introId, shipNo) {
    const response = await fetch(
      `${BACKEND}/intro/move?introId=${introId}&shipNo=${shipNo}`,
    );
    return response.json();
  }, 300);

  static getGame = debounce(async function (gameId, shipNo) {
    const response = await fetch(
      `${BACKEND}/game?gameId=${gameId}&shipNo=${shipNo}`,
    );
    return response.json();
  }, 300);

  static getGameMove = debounce(async function (gameId, shipNo, userInputs) {
    userInputs = userInputs ? userInputs : [];
    const response = await fetch(
      `${BACKEND}/game/move?gameId=${gameId}&shipNo=${shipNo}&userInputs=${JSON.stringify(
        userInputs,
      )}`,
    );
    return response.json();
  }, 300);

  static getOutro = debounce(async function (outroId, shipNo) {
    const response = await fetch(
      `${BACKEND}/outro?outroId=${outroId}&shipNo=${shipNo}`,
    );
    return response.json();
  }, 300);

  static submitWin = debounce(async function (winId, shipNo) {
    const response = await fetch(
      `${BACKEND}/win?winId=${winId}&shipNo=${shipNo}`,
    );
    return response.json();
  }, 300);

  static checkHint = debounce(async function (gameId, shipNo) {
    const response = await fetch(
      `${BACKEND}/game/hint/getHint?gameId=${gameId}&shipNo=${shipNo}`,
    );
    return response.json();
  }, 500);
}

window.API = API;
