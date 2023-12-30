const Sequelize = require("sequelize");
const sequelize = require("../database");

const Slot = sequelize.define("slot", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  available: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
});

module.exports = Slot;
