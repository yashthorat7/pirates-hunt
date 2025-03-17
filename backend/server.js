const express = require('express');
const cors = require('cors');
const app = express();

const lobbyRoutes = {
    getLobby: require('./routes/getLobby')
};

const introRoutes = {
    getIntro: require('./routes/getIntro'),
    getIntroMove: require('./routes/getIntroMove')
};

const puzzleRoutes = {
    getGame: require('./routes/getGame'),
    getHint: require('./routes/getHint'),
    getGameMove: require('./routes/getGameMove')
};

const outroRoutes = {
    getOutro: require('./routes/getOutro')
};

app.use(cors());
app.use(express.json());

app.use('/api/lobby', lobbyRoutes.getLobby);
app.use('/', puzzleRoutes.getHint);
app.use('/api/intro', introRoutes.getIntro);
app.use('/api/intro/move', introRoutes.getIntroMove);

app.use('/api/puzzle/game', puzzleRoutes.getGame);
app.use('/api/puzzle/hint', puzzleRoutes.getHint);
app.use('/api/puzzle/move', puzzleRoutes.getGameMove);

app.use('/api/outro', outroRoutes.getOutro);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));