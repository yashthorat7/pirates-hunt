const express = require('express');
const cors = require('cors');
const app = express();

const dialogueRoutes = require('./routes/getDialogues');
const hintRoutes = require('./routes/getHint');
const timeRoutes = require('./routes/setTimes');
const outroRoutes = require('./routes/getOutro');


app.use(cors());
app.use(express.json());

app.use('/', hintRoutes);
app.use('/', dialogueRoutes);
app.use('/', timeRoutes);
app.use('/', outroRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
