const express = require('express');
const cors = require('cors');
const app = express();

const timeRoutes = require('./routes/setTimes');
const hintRoutes = require('./routes/getHint');

const gameRoutes = {
    puzzle: [
        require('./routes/getJigsaw'),
        require('./routes/getCount360'),
        require('./routes/getMaze'),
        require('./routes/getStoneJump')
    ],
    word: [
        require('./routes/getWordGuess'),
        require('./routes/getManuscripts')
    ],
    misc: [
        require('./routes/getGhost'),
        require('./routes/getBullsNCows'),
        require('./routes/getSlides')
    ]
};

app.use(cors());
app.use(express.json());

app.use('/', timeRoutes);
app.use('/', hintRoutes);

Object.entries(gameRoutes).forEach(([category, routes]) => {
    routes.forEach(route => {
        app.use(`/api/${category}`, route);
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
