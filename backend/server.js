const express = require('express');
const cors = require('cors');
const app = express();

const dialogueRoutes = require('./routes/getDialogues');

app.use(cors());
app.use(express.json());

app.use('/', dialogueRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
