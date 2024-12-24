const { neon } = require("@neondatabase/serverless");

const sql = neon('postgresql://neondb_owner:okUVySFRs04v@ep-patient-snowflake-a5gdjm0k.us-east-2.aws.neon.tech/neondb?sslmode=require');

const readShipData = async (tableName, shipNo, gameNo) => {
    try {
        const columnName = `game${gameNo}`;
        const query = `SELECT ${columnName} FROM ${tableName} WHERE shipNo = $1;`;
        const result = await sql(query, [shipNo]);
        return result.length > 0 ? result[0][columnName] : null;
    } catch (error) {
        throw error;
    }
};

const writeShipData = async (tableName, shipNo, gameNo, data) => {
    try {
        const columnName = `game${gameNo}`;
        const query = `UPDATE ${tableName} SET ${columnName} = $1 WHERE shipNo = $2;`;
        await sql(query, [data, shipNo]);
    } catch (error) {
        throw error;
    }
};

module.exports = { readShipData, writeShipData, sql };
