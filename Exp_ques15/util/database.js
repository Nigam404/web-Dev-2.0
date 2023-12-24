const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",  //username of Mysql workbench
  database: "node_complete", //database name  
  password: "Nigam@12345", //password of our workbench
});

module.exports = pool.promise();
