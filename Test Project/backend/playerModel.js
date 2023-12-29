const Sequelize = require("sequelize");
const sequelize = require("./database");

//Defining player table schema.
const Player = sequelize.define("player", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: Sequelize.DATEONLY,
  photourl: Sequelize.STRING,
  birthplace: Sequelize.STRING,
  career: Sequelize.STRING,
  matches: Sequelize.INTEGER,
  score: Sequelize.INTEGER,
  fifties: Sequelize.INTEGER,
  centuries: Sequelize.INTEGER,
  wickets: Sequelize.INTEGER,
  average: Sequelize.DOUBLE,
});

module.exports = Player;
