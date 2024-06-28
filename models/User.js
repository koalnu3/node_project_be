const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      default: "customer", //3type: customer, unsigned ,teacher, admin
    },
    introduction: {
      type: String,
      required: false,
    },
    career: {
      type: Array,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    information:{
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;