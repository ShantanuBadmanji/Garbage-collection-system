import { config } from "dotenv";
import mysql2 from "mysql2/promise";
config();
const configOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "garbage_collection_system",
  multipleStatements: true,
};

const db = await mysql2.createConnection(configOptions);
console.log(db);

export { db };
