const { neon } = require("@neondatabase/serverless");

const sql = neon('postgresql://neondb_owner:okUVySFRs04v@ep-patient-snowflake-a5gdjm0k.us-east-2.aws.neon.tech/neondb?sslmode=require');


const createTable = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS shipTable (
        shipNo INTEGER PRIMARY KEY,
        beginTime TEXT,
        startTime TEXT,
        endTime TEXT,
        unlocked TEXT,
        solved TEXT
      )
    `;

    console.log("Table 'shipTable' created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};



module.exports = sql;
