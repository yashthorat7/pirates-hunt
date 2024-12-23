const { neon } = require("@neondatabase/serverless");

const sql = neon('postgresql://neondb_owner:okUVySFRs04v@ep-patient-snowflake-a5gdjm0k.us-east-2.aws.neon.tech/neondb?sslmode=require');

const arrtoString = (arr, gameNo, newValue) => {
    arr[gameNo] = newValue;
    const result = arr.join(',');
    return result;
};

const readShipData = async (shipNo, columnName) => {
    const query = `SELECT ${columnName} FROM shipTable WHERE shipNo = $1`;
    const result = await sql(query, [shipNo]);
    let string = '';
    if (columnName === 'begintime') {
        string = result[0].begintime;
    } else if (columnName === 'starttime') {
        string = result[0].starttime;
    } else if (columnName === 'endtime') {
        string = result[0].endtime;
    } else if (columnName === 'unlocked') {
        string = result[0].unlocked;
    } else if (columnName === 'solved') {
        string = result[0].solved;
    }

    if (string && string.length > 0) {
        const parsedArray = string.split(',').map(Number);
        return parsedArray;
    } else {
        return Array(9).fill(0);
    }
};

const writeShipData = async (shipNo, columnName, gameNo, data) => {
    const parsedArray = await readShipData(shipNo, columnName);
    const updatedString = arrtoString(parsedArray, gameNo, data);
    const updateQuery = `UPDATE shipTable SET ${columnName} = $1 WHERE shipNo = $2`;
    await sql(updateQuery, [updatedString, shipNo]);
};

const readClue = async (shipNo, gameNo) => { 
    const gameColumn = `game${gameNo + 1}`;
    const clueColumn = `clue${gameNo}`;  

    const query = `SELECT ${gameColumn}, ${clueColumn} FROM clueTable WHERE shipNo = $1`;
    const result = await sql(query, [shipNo]);
    return Object.values(result[0]);
};

module.exports = {readShipData, writeShipData, readClue, sql};
