const express = require("express");
const bodyparser = require("body-parser");
const route = require("./routes/route");
const sequelize = require("./utils/database");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use("/api", route);

//server is listening on port 4000
sequelize
  .sync()
  .then((res) => app.listen(4000))
  .catch((err) => console.log(err));
