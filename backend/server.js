const express = require('express');
const cors = require('cors');
const app = express();

const getIntro = require('./routes/getIntro');
const getIntroMove = require('./routes/getIntroMove')

const getGame = require('./routes/getGame');
const getHint = require('./routes/getHint');
const getGameMove = require('./routes/getGameMove');

const getOutro = require('./routes/getOutro');

const getWin = require('./routes/getWin');


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

app.use('/intro', getIntro);
app.use('/intro/move', getIntroMove);

app.use('/game', getGame);
app.use('/game/hint', getHint);
app.use('/game/move', getGameMove);

app.use('/outro', getOutro);
app.use('/win', getWin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));