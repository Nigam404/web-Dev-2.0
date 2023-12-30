const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const sequelize = require("./database");
const route = require("./routes");

//app
const app = express();

//middlewares
app.use(cors());
app.use(bodyparser.json());

//route
app.use(route);

//syncing app with db.
sequelize.sync().then(() => {
  app.listen(3000);
});