const express = require("express");
const route = require("./routes/route");
const bodyParser = require("body-parser");
const sequelize = require("../Backend/util/database");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", route);


sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
