const Sequelize = require("sequelize");

//creating pool
const sequelize = new Sequelize("node_complete", "root", "Nigam@12345", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
