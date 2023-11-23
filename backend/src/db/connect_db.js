(await import("dotenv")).config();
import session from "express-session";
import MySQLStore from "express-mysql-session";
import mysql2 from "mysql2/promise";

const basicConfigOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "garbage_collection_system",
};
const mysql2ConfigOptions = {
  ...basicConfigOptions,
  multipleStatements: true,
};

const db = await mysql2.createConnection(mysql2ConfigOptions);

const MySQLStoreClass = MySQLStore(session);
const sessionStore = new MySQLStoreClass(basicConfigOptions, db);

sessionStore
  .onReady()
  .then(() => console.log("MySQLStore ready"))
  .catch((error) => console.error(error));

export { db, sessionStore };
