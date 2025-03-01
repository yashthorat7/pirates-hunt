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
    const integer = istHours * 3600 + istMinutes * 60 + istSeconds;
    console.log(integer);
    return integer;
  }

async function setBeginTime(gameNo, shipNo) {
    const col = `game${gameNo}`;
    const timeVal = getTime();
    const selectQuery = `SELECT ${col} FROM beginTime WHERE shipNo = $1`;
    const selectResult = await pool.query(selectQuery, [shipNo]);
    if (selectResult.rowCount > 0) {
        const currentVal = selectResult.rows[0][col];
        if (true) {
        const updateQuery = `UPDATE beginTime SET ${col} = $1 WHERE shipNo = $2 RETURNING *`;
        const updateResult = await pool.query(updateQuery, [timeVal, shipNo]);
        return updateResult.rows[0];
        } else {
        return { message: "Cell already set, no update performed" };
        }
    } else {
        const insertQuery = `INSERT INTO beginTime (shipNo, ${col}) VALUES ($1, $2) RETURNING *`;
        const insertResult = await pool.query(insertQuery, [shipNo, timeVal]);
        return insertResult.rows[0];
    }
}

async function setStartTime(gameNo, shipNo) {
    const col = `game${gameNo}`;
    const timeVal = getTime();
    const q = `INSERT INTO startTime (shipNo, ${col}) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(q, [shipNo, timeVal]);
    return result.rows[0];
}

async function setEndTime(gameNo, shipNo) {
    const col = `game${gameNo}`;
    const timeVal = getTime();
    const q = `INSERT INTO endTime (shipNo, ${col}) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(q, [shipNo, timeVal]);
    return result.rows[0];
}

async function setUnlocked(gameNo, shipNo, value) {
    const col = `game${gameNo}`;
    const selectQuery = `SELECT ${col} FROM unlocked WHERE shipNo = $1`;
    const selectResult = await pool.query(selectQuery, [shipNo]);
    if (selectResult.rowCount > 0) {
        const currentVal = selectResult.rows[0][col];
        if (currentVal === 0 || currentVal === null) {
        const updateQuery = `UPDATE unlocked SET ${col} = $1 WHERE shipNo = $2 RETURNING *`;
        const updateResult = await pool.query(updateQuery, [value, shipNo]);
        return updateResult.rows[0];
        } else {
        return { message: "Cell already set, no update performed" };
        }
    } else {
        const insertQuery = `INSERT INTO unlocked (shipNo, ${col}) VALUES ($1, $2) RETURNING *`;
        const insertResult = await pool.query(insertQuery, [shipNo, value]);
        return insertResult.rows[0];
    }
}

async function getBeginTime(shipNo, gameNo) {
    const col = `game${gameNo}`;
    const q = `SELECT ${col} FROM beginTime WHERE shipNo = $1`;
    const result = await pool.query(q, [shipNo]);
    return result.rows[0];
}

async function getStartTime(shipNo, gameNo) {
    const col = `game${gameNo}`;
    const q = `SELECT ${col} FROM startTime WHERE shipNo = $1`;
    const result = await pool.query(q, [shipNo]);
    return result.rows[0];
}

async function getEndTime(shipNo, gameNo) {
    const col = `game${gameNo}`;
    const q = `SELECT ${col} FROM endTime WHERE shipNo = $1`;
    const result = await pool.query(q, [shipNo]);
    return result.rows[0];
}

async function getUnlocked(gameNo, shipNo) {
    const col = `game${gameNo}`;
    const q = `SELECT ${col} FROM unlocked WHERE shipNo = $1`;
    const result = await pool.query(q, [shipNo]);
    return result.rows[0];
}

module.exports = {
    setBeginTime,
    setStartTime,
    setEndTime,
    setUnlocked,
    getBeginTime,
    getStartTime,
    getEndTime,
    getUnlocked,
    getTime
};