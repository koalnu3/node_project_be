const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isMath = await bcrypt.compare(password, user.password);
      if (isMath) {
        //token
        const token = await user.generateToken();
        return res.status(200).json({ statsus: "success", user, token });
      }
    }
    throw new Error("이메일 또는 비밀번호를 다시 입력해주세요.");
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

//인증
authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) throw new Error("token not found");
    const token = tokenString.replace("Bearer ", ""); //순수토큰만 걸러내기
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) throw new Error("invaild token");
      req.userId = payload._id;
    });
    next();
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

//어드민 인가
authController.checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user.level !== "admin") throw new Error("no permission");
    next();
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = authController;
