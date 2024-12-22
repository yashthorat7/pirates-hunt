const { neon } = require("@neondatabase/serverless");

const sql = neon('postgresql://neondb_owner:okUVySFRs04v@ep-patient-snowflake-a5gdjm0k.us-east-2.aws.neon.tech/neondb?sslmode=require');

const updateOrReadCell = async (shipNo, column_name, data) => {
    try {
        if (data === undefined || data === null) {
            const result = await sql`
                SELECT ${sql(column_name)} FROM shipTable WHERE shipNo = ${shipNo}
            `;
            return result[0][column_name];
        } else {
            const currentValue = await sql`
                SELECT ${sql(column_name)} FROM shipTable WHERE shipNo = ${shipNo}
            `;
            const currentColumnValue = currentValue[0][column_name];

            if (currentColumnValue > 0) {
                console.log(`Value of ${column_name} for shipNo ${shipNo} is greater than 0. No update needed.`);
            } else {
                await sql`
                    UPDATE shipTable
                    SET ${sql(column_name)} = ${data}
                    WHERE shipNo = ${shipNo}
                `;
                console.log(`Updated ${column_name} for shipNo ${shipNo} to ${data}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

updateOrReadCell(11, 'unlocked');
updateOrReadCell(11, 'unlocked', '1,0,0,0,0,0,0,0,0,0'); 

module.exports = sql;
