//Connecting mysql DB using sequelize in this program...
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminR");
const shopRoutes = require("./routes/shopR");
const errorController = require("./controllers/errorC");
const Product = require("./models/productM");
const User = require("./models/userM");
const Cart = require("./models/cartM");
const cartItem = require("./models/cart-itemM");

const sequelize = require("./util/database");

const app = express();

//setting ejs views
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//middleware for testing db relationship.
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user; //crating another req obj property 'user' and storing retrieved user data in it.
      next(); //calling  next middleware.
    })
    .catch((err) => console.log(err));
});

//routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//defining relationship/associations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: cartItem });
Product.belongsToMany(Cart, { through: cartItem });

sequelize
  // .sync({ force: true }) //force:true to override table structure in DB, if table already exist.
  .sync()
  .then((res) => {
    //testing on dummy data
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) return User.create({ name: "Nigam", email: "nkc@gmail.com" });
    else return user;
  })
  .then((user) => {
    return user.createCart();  //creating cart assoiciated with user.
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
