const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'game.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS game_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id TEXT NOT NULL,
        ship_no INTEGER NOT NULL,
        start_time DATETIME,
        intro_time DATETIME,
        outro_time DATETIME,
        solved BOOLEAN DEFAULT 0,
        unlocked BOOLEAN DEFAULT 0,
        UNIQUE(game_id, ship_no)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS runtime_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_log TEXT,
        question_index INTEGER,
        assigned_word TEXT
    )`);
});

const dbAsync = {
    get: (sql, params) => new Promise((resolve, reject) => {
        db.get(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    }),
    
    all: (sql, params) => new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    }),
    
    run: (sql, params) => new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    })
};

const updateGameProgress = async (gameId, shipNo, data) => {
    const fields = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');
    
    await dbAsync.run(
        `INSERT INTO game_progress (game_id, ship_no, ${fields})
         VALUES (?, ?, ${placeholders})
         ON CONFLICT(game_id, ship_no) 
         DO UPDATE SET ${fields.split(', ').map(f => `${f}=excluded.${f}`).join(', ')}`,
        [gameId, shipNo, ...values]
    );
};

const getGameProgress = async (gameId, shipNo) => {
    return await dbAsync.get(
        'SELECT * FROM game_progress WHERE game_id = ? AND ship_no = ?',
        [gameId, shipNo]
    );
};

const updateRuntimeData = async (data) => {
    const { questionLog, questionIndex, assignedWord } = data;
    await dbAsync.run(
        `INSERT INTO runtime_data (question_log, question_index, assigned_word)
         VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
         question_log=excluded.question_log,
         question_index=excluded.question_index,
         assigned_word=excluded.assigned_word`,
        [JSON.stringify(questionLog), questionIndex, assignedWord]
    );
};

const getRuntimeData = async () => {
    const data = await dbAsync.get('SELECT * FROM runtime_data LIMIT 1');
    return data ? {
        questionLog: JSON.parse(data.question_log),
        questionIndex: data.question_index,
        assignedWord: data.assigned_word
    } : null;
};

process.on('SIGINT', () => {
    db.close();
    process.exit();
});

module.exports = {
    updateGameProgress,
    getGameProgress,
    updateRuntimeData,
    getRuntimeData
};
