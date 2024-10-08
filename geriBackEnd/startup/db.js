const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  const db = process.env.DB;
  console.log(db);
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
};
