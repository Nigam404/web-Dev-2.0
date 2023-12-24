const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root", //mysql workbench user name
  database: "node_complete", //database name in mysql
  password: "Nigam@12345", //sql workbench password for user 'root'
});

module.exports = pool.promise();
