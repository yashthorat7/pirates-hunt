const express = require('express');
const cors = require('cors');
const app = express();

const messageRoutes = require('./routes/messages');

app.use(cors());
app.use(express.json());


app.use('/', messageRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
