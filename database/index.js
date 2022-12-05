import mysql from "mysql2/promise";

const database = { connection: null };

(async () => {
  database.connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ecommerce",
    password: "123",
  });
  console.log("Database connected");
})();

module.exports = database;
