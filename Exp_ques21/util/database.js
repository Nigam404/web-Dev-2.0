const Sequelize = require("sequelize");

//setting the connection pool using sequelize
const sequelize = new Sequelize("node_complete", "root", "Nigam@12345", {
  dialect: "mysql",
  host: "localhost",
}); //(database name,user name,password,additional info object)

module.exports = sequelize;
