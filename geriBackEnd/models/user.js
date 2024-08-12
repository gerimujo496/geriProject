const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 50,
  },
  password: { type: String, required: true, minlength: 8 },
});

function validateCreateUser(userBody) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(10).max(50).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
  });
  return schema.validate(userBody);
}
function validateLoginUser(userBody) {
  const schema = Joi.object({
    email: Joi.string().min(10).max(50).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(userBody);
}

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },

    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "10h" }
  );
  return token;
};
const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validateCreateUser = validateCreateUser;
exports.validateLoginUser = validateLoginUser;
