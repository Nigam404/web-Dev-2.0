//Connecting mysql DB in this program...
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminR");
const shopRoutes = require("./routes/shopR");
const errorController = require("./controllers/errorC");

const app = express();

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
