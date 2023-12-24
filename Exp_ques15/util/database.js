const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "root",
  user: "root",
  database: "node_complete",
  password: "Nigam@12345",
});

module.exports = pool.promise();
