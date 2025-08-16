const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

function getTime() {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();
    let istHours = utcHours + 5;
    let istMinutes = utcMinutes + 30;
    let istSeconds = utcSeconds;
    if (istMinutes >= 60) {
        istHours += 1;
        istMinutes -= 60;
    }
    if (istHours >= 24) {
        istHours -= 24;
    }
    return istHours * 3600 + istMinutes * 60 + istSeconds;
}

async function readShipData(table, gameNo, shipNo) {
    try {
        const col = `game${gameNo}`;
        const query = `SELECT ${col} FROM ${table} WHERE shipNo = $1`;
        const result = await pool.query(query, [shipNo]);

        if (result.rows.length === 0) {
            throw new Error(`No data found for shipNo: ${shipNo}`);
        }

        return Object.values(result.rows[0])[0];
    } catch (error) {
        console.error('Error reading ship data:', error.message);
        return null;
    }
}

async function writeShipData(table, gameNo, shipNo, value) {
    try {
        const col = `game${gameNo}`;
        const timeVal = value !== undefined ? value : getTime();

        if (['begintime', 'endtime', 'starttime'].includes(table)) {
            const selectQuery = `SELECT ${col} FROM ${table} WHERE shipNo = $1`;
            const selectResult = await pool.query(selectQuery, [shipNo]);

            if (selectResult.rowCount > 0) {
                const currentValue = selectResult.rows[0][col];
                if (currentValue > 0) {
                    return;
                }
            }
        }

        const updateQuery = `UPDATE ${table} SET ${col} = $1 WHERE shipNo = $2 RETURNING *`;
        await pool.query(updateQuery, [timeVal, shipNo]);
    } catch (error) {
        console.error('Error writing ship data:', error.message);
    }
}

async function addTable() {
    try {
        await pool.query(`
            DO $$
            BEGIN
                -- begintime
                CREATE TABLE IF NOT EXISTS begintime (
                    shipno INTEGER PRIMARY KEY,
                    game1 INTEGER, game2 INTEGER, game3 INTEGER, game4 INTEGER, game5 INTEGER,
                    game6 INTEGER, game7 INTEGER, game8 INTEGER, game9 INTEGER, game10 INTEGER DEFAULT 0
                );
                IF NOT EXISTS (SELECT 1 FROM begintime) THEN
                    INSERT INTO begintime (shipno)
                    SELECT generate_series(11, 50);
                END IF;

                -- endtime
                CREATE TABLE IF NOT EXISTS endtime (
                    shipno INTEGER PRIMARY KEY,
                    game1 INTEGER, game2 INTEGER, game3 INTEGER, game4 INTEGER, game5 INTEGER,
                    game6 INTEGER, game7 INTEGER, game8 INTEGER, game9 INTEGER
                );
                IF NOT EXISTS (SELECT 1 FROM endtime) THEN
                    INSERT INTO endtime (shipno)
                    SELECT generate_series(11, 50);
                END IF;

                -- starttime
                CREATE TABLE IF NOT EXISTS starttime (
                    shipno INTEGER PRIMARY KEY,
                    game1 INTEGER, game2 INTEGER, game3 INTEGER, game4 INTEGER, game5 INTEGER,
                    game6 INTEGER, game7 INTEGER, game8 INTEGER, game9 INTEGER
                );
                IF NOT EXISTS (SELECT 1 FROM starttime) THEN
                    INSERT INTO starttime (shipno)
                    SELECT generate_series(11, 50);
                END IF;

                -- unlocked
                CREATE TABLE IF NOT EXISTS unlocked (
                    shipno INTEGER PRIMARY KEY,
                    game1 SMALLINT, game2 SMALLINT, game3 SMALLINT, game4 SMALLINT, game5 SMALLINT,
                    game6 SMALLINT, game7 SMALLINT, game8 SMALLINT, game9 SMALLINT, game10 SMALLINT
                );
                IF NOT EXISTS (SELECT 1 FROM unlocked) THEN
                    INSERT INTO unlocked (shipno)
                    SELECT generate_series(11, 50);
                END IF;
            END
            $$;
        `);
    } catch (error) {
        console.error('Error making the table: ', error);
    }
}

async function deleteTable() {
    try {
        await pool.query(`
            DROP TABLE IF EXISTS begintime CASCADE;
            DROP TABLE IF EXISTS endtime CASCADE;
            DROP TABLE IF EXISTS starttime CASCADE;
            DROP TABLE IF EXISTS unlocked CASCADE;
        `);
    } catch (error) {
        console.error("Error deleting the tables: ", error);
    }
}

module.exports = {
    readShipData,
    writeShipData,
    addTable,
    deleteTable,
    getTime
};
