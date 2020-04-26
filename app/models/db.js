const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//Create a connect to the database
const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

//open the MySQL connection
// connection.getConnection(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

module.exports = connection;
