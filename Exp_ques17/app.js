//Connecting mysql DB using sequelize in this program...
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminR");
const shopRoutes = require("./routes/shopR");
const errorController = require("./controllers/errorC");
const sequelize = require("./util/database");

const app = express();

//setting ejs views
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync() //it sync our model to the database by creating table using the provided schema.
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
