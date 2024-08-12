
const express = require("express");
const auth = require("../routes/auth");

require("express-async-errors");



module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);

};
