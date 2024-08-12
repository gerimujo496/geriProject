const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {
  User,
  validateCreateUser,
  validateLoginUser,
} = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
require("express-async-errors");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send({ token: token });
});

router.post("/createUser", async (req, res) => {
  const { error } = validateCreateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password != req.body.confirmPassword)
    return res.status(400).send("The passwords don't  match !");

  const isEmailRegistered = await User.findOne({ email: req.body.email });

  if (isEmailRegistered)
    return res.status(400).send("The email already exists !");

  const newUser = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const newUserSaved = await newUser.save();
  const token = newUser.generateAuthToken();
  res
    .header("x-auth-token", token)
    .status(201)
    .send(_.pick(newUserSaved, [ "name", "email"]));
});



module.exports = router;
