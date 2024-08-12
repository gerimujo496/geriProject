const express = require("express");
require("dotenv").config();
const winston = require("winston");


const app = express();


require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);


const port = process.env.PORT || 4000;

const server = app.listen(port, () =>
  winston.info(`listening on port ${port}`)
);
