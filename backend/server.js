const express = require('express');
const cors = require('cors');
const app = express();

const dialogueRoutes = require('./routes/getDialogues');
const hintRoutes = require('./routes/getHint');
const timeRoutes = require('./routes/setTimes');
const introRoutes = require('./routes/getIntro');
const outroRoutes = require('./routes/getOutro');
const jigsawRoutes = require('./routes/getJigsaw');
const count360Routes = require('./routes/getCount360');
const mazeRoutes = require('./routes/getMaze');
const stoneJumpRoutes = require('./routes/getStoneJump.js');

app.use(cors());
app.use(express.json());

app.use('/', hintRoutes);
app.use('/', dialogueRoutes);
app.use('/', timeRoutes);
app.use('/', introRoutes);
app.use('/', outroRoutes);
app.use('/', jigsawRoutes);
app.use('/', count360Routes);
app.use('/', mazeRoutes);
app.use('/', stoneJumpRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
