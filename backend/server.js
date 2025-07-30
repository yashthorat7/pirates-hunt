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

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', puzzleRoutes.getHint);
app.use('/intro', introRoutes.getIntro);
app.use('/intro/move', introRoutes.getIntroMove);

app.use('/puzzle/game', puzzleRoutes.getGame);
app.use('/puzzle/hint', puzzleRoutes.getHint);
app.use('/puzzle/move', puzzleRoutes.getGameMove);

app.use('/outro', outroRoutes.getOutro);
app.use('/win', winRoutes.getWin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));