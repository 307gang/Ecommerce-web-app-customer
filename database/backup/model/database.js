// get the client
const mysql = require("mysql2/promise");
require("dotenv").config();

const db = { connection: null };

(async () => {
  // create the connection to database
  db.connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  console.log("Database connected!");
})();

module.exports = db;
