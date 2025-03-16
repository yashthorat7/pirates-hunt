const express = require('express');
const cors = require('cors');
const app = express();

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

const winRoutes = {
    getWin: require('./routes/getWin')
};

app.use(cors());
app.use(express.json());

app.use('/', puzzleRoutes.getHint);
app.use('/api/intro', introRoutes.getIntro);
app.use('/api/intro/move', introRoutes.getIntroMove);

app.use('/api/puzzle/game', puzzleRoutes.getGame);
app.use('/api/puzzle/hint', puzzleRoutes.getHint);
app.use('/api/puzzle/move', puzzleRoutes.getGameMove);

app.use('/api/outro', outroRoutes.getOutro);
app.use('/api/win', winRoutes.getWin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));