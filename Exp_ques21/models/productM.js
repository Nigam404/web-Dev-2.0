//Model using sequelize.
const Sequelize = require("sequelize");

const sequelize = require("../util/database"); //connection pool

//Creating database.
//database name=product.
//model name=Product.
//define takes two parameter that are db name and js object having schema.
const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
