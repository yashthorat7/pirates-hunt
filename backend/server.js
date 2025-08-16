const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const db = require('./config/db');

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

const getIntro = require('./routes/getIntro');
const getIntroMove = require('./routes/getIntroMove')

const getGame = require('./routes/getGame');
const getHint = require('./routes/getHint');
const getGameMove = require('./routes/getGameMove');

const getOutro = require('./routes/getOutro');

const getWin = require('./routes/getWin');


const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || origin === allowedOrigin) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy: Not allowed'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// db.deleteTable();  //use ti carefully
db.addTable();

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