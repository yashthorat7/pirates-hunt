const { neon } = require("@neondatabase/serverless");

const sql = neon('postgresql://neondb_owner:okUVySFRs04v@ep-patient-snowflake-a5gdjm0k.us-east-2.aws.neon.tech/neondb?sslmode=require');

const readShipData = async (tableName, shipNo, gameNo) => {
    try {
        let columnName = `game${gameNo}`;
        const query = `SELECT ${columnName} FROM ${tableName} WHERE shipNo = $1;`;
        const result = await sql(query, [shipNo]);
        let outputResult = null;

        if (columnName === 'game1') {
            outputResult = result[0].game1;
        }else if (columnName === 'game2') {
            outputResult = result[0].game2;
        }else if (columnName === 'game3') {
            outputResult = result[0].game3;
        } else if (columnName === 'game4') {
            outputResult = result[0].game4;
        }else if (columnName === 'game5') {
            outputResult = result[0].game5;
        } else if (columnName === 'game6') {
            outputResult = result[0].game6;
        }else if (columnName === 'game7') {
            outputResult = result[0].game7;
        } else if (columnName === 'game8') {
            outputResult = result[0].game8;
        } else if (columnName === 'game9') {
            outputResult = result[0].game9;
        } else if (columnName === 'game10') {
            outputResult = result[0].game10;
        }
        return outputResult;
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

const readClue = async (shipNo, gameNo) => { 
    try {
        const gameColumn = `game${gameNo + 1}`;
        const clueColumn = `clue${gameNo}`;
        const query = `SELECT ${gameColumn}, ${clueColumn} FROM clueTable WHERE shipNo = $1`;
        const result = await sql(query, [shipNo]);
        return result.clue1;
    } catch (error) {
        throw error;
    }
};

module.exports = { readShipData, writeShipData, readClue, sql };
