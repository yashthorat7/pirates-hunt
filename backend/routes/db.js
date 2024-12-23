const { neon } = require("@neondatabase/serverless");

const sql = neon('postgresql://neondb_owner:okUVySFRs04v@ep-patient-snowflake-a5gdjm0k.us-east-2.aws.neon.tech/neondb?sslmode=require');

const arrtoString = (arr, gameNo, newValue) => {
    arr[gameNo] = newValue;
    const result = arr.join(',');
    return result;
};

const readOrWriteShip = async (shipNo, gameNo, columnName, data) => {
    try {
        const query = `SELECT ${columnName} FROM shipTable WHERE shipNo = $1`;
        const result = await sql(query, [shipNo]);
        
        const string = result[0][columnName];
        const parsedArray = string.split(',').map(Number);
        if (data === undefined || data === null) {
            return parsedArray[gameNo];
        } else {
            const updatedString = arrtoString(parsedArray, gameNo, data);
            const updateQuery = `UPDATE shipTable SET ${columnName} = $1 WHERE shipNo = $2`;
            await sql(updateQuery, [updatedString, shipNo]);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
    
const readClue = async (shipNo, gameNo) => { 
    try {
        const gameColumn = `game${gameNo + 1}`;
        const clueColumn = `clue${gameNo}`;  

        const query = `
            SELECT ${gameColumn}, ${clueColumn} FROM cluesTable WHERE shipNo = $1
        `;
        
        const result = await sql(query, [shipNo]);

        return Object.values(result[0]);
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

(async () => {
    readStatus = await readClue(12, 4);
    console.log('readStatus: ', readStatus);
    // const unlockedStatus = await readOrWriteShip(11, 3, 'unlocked');
    // console.log('unloked: ', unlockedStatus);
    // await readOrWriteShip(11, 3, 'unlocked', '6');
})();

module.exports = sql;
