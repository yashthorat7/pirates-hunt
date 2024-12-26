const { neon } = require("@neondatabase/serverless");

const sql = neon('postgresql://neondb_owner:okUVySFRs04v@ep-patient-snowflake-a5gdjm0k.us-east-2.aws.neon.tech/neondb?sslmode=require');

const readShipData = async (tableName, shipNo, gameNo) => {
    try {
        let columnName = `game${gameNo}`;
        const query = `SELECT ${columnName} FROM ${tableName} WHERE shipNo = $1;`;
        const result = await sql(query, [shipNo]);
        console.log(tableName, ': result', result, 'resultcolumn', result[0][columnName]);
        return result[0][columnName];
    } catch (error) {
        throw error;
    }
};

const writeShipData = async (tableName, shipNo, gameNo, data) => {
    try {
        const columnName = `game${gameNo}`;
        const query = `UPDATE ${tableName} SET ${columnName} = $1 WHERE shipNo = $2;`;
        await sql(query, [data, shipNo]);
        console.log(tableName, ', is updated with', data);
    } catch (error) {
        throw error;
    }
};

const readClue = async (shipNo, gameNo) => { 
    try {
        const gameColumn = `game${gameNo + 1}`;
        const clueColumn = `clue${gameNo}`;
        const query = `SELECT ${gameColumn}, ${clueColumn} FROM clueTable WHERE shipNo = $1`;
        const result = await sql(query, [shipNo]);
        return [result[0][gameColumn], result[0][clueColumn]];
    } catch (error) {
        throw error;
    }
};

module.exports = { readShipData, writeShipData, readClue, sql };
