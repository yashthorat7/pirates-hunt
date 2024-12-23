const express = require('express');
const cors = require('cors');
const app = express();
const http = require("http");
const sql = require("./routes/db");

const dialogueRoutes = require('./routes/getDialogues');
const hintRoutes = require('./routes/getHint');
const timeRoutes = require('./routes/setTimes');
const introRoutes = require('./routes/getIntro');
const outroRoutes = require('./routes/getOutro');
const jigsawRoutes = require('./routes/getJigsaw');
const count360Routes = require('./routes/getCount360');

app.use(cors());
app.use(express.json());

//app.use('/', hintRoutes);
app.use('/', dialogueRoutes);
app.use('/', timeRoutes);
app.use('/',introRoutes);
// app.use('/', outroRoutes);

app.use('/', jigsawRoutes);
app.use('/', count360Routes);


const requestHandler = async (req, res) => {
    try {
      const result = await sql`SELECT version()`;
      const { version } = result[0];
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`PostgreSQL Version: ${version}`);
    } catch (error) {
      console.error("Database error:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error connecting to the database.");
    }
};


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
