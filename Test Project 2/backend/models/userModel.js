const Sequelize = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("userSchedule", {
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
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slot: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slotid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
