require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(morgan("combined"));
app.use("/", routes);

app.listen(process.env.PORT, () =>
  console.log("App listening on port " + process.env.PORT)
);
