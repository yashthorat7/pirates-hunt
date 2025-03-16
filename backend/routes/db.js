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

module.exports = {
    readShipData,
    writeShipData,
    getTime
};
