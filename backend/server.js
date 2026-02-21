const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const db = require('./config/db');

const envOrigins = process.env.ALLOWED_ORIGINS || '*';
let allowedOrigins = [];

if (envOrigins === '*' || envOrigins.trim() === '*' || envOrigins.trim() === '"*"' || envOrigins.trim() === "'*'") {
    allowedOrigins = ['*'];
} else {
    allowedOrigins = envOrigins
        .split(/[,\s;]+/)
        .map(url => url.trim().replace(/^['"]|['"]$/g, '').replace(/\/$/, ''))
        .filter(Boolean);
}

const getIntro = require('./routes/getIntro');
const getIntroMove = require('./routes/getIntroMove');
const getGame = require('./routes/getGame');
const getHint = require('./routes/getHint');
const getGameMove = require('./routes/getGameMove');
const getOutro = require('./routes/getOutro');
const getWin = require('./routes/getWin');

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes('*')) {
            return callback(null, true);
        }

        const cleanOrigin = origin.trim().replace(/\/$/, '');
        
        if (allowedOrigins.includes(cleanOrigin)) {
            callback(null, true);
        } else {
            console.error(`CORS blocked. Origin: "${origin}", Allowed: [${allowedOrigins.join(', ')}]`);
            callback(new Error('CORS policy: Not allowed'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
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