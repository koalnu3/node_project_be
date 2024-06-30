const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.checkNickname = async (req, res, next) => {
  try {
    let { nickname } = req.body;
    const userByNickname = await User.findOne({ nickname });
    if (userByNickname) {
      throw new Error("이미 가입된 닉네임입니다.");
    }
    console.log("userByNickname", userByNickname);
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.updateCustomer = async (req, res) => {
  try {
    const { nickname, image, career } = req.body;
    const userData = await User.findByIdAndUpdate(
      { _id: req.userId },
      { nickname, image, career },
      { new: true }
    );

    if (!userData) throw new Error("User data doesn't exist");

    res.status(200).json({ status: "success", data: userData });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.createUser = async (req, res) => {
  try {
    let {
      email,
      password,
      nickname,
      image,
      phoneNumber,
      level,
      introduction,
      career,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      nickname,
      image,
      phoneNumber,
      level: level ? level : "customer",
      introduction: introduction ? introduction : "",
      career: career ? career : "",
    });
    await newUser.save();
    return res.status(200).json({ status: "success", user });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

//유저수정
userController.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) throw new Error("No user found");

    res.status(200).json({ status: "success", updatedUser });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      return res.status(200).json({ status: "success", user });
    }
    throw new Error("invaild token");
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};

//유저삭제
userController.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error("No user found");

    res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

//관리자 -> 전체유저 조회
userController.getUserList = async (req, res) => {
  try {
    const { page, nickname, level } = req.query;
    const PAGE_SIZE = 10;

    const cond = {
      ...(nickname && { nickname: { $regex: nickname, $options: "i" } }),
      ...(level && { level: { $in: [level] } }),
    };

    const query = User.find(cond)
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
    const totalItemNum = await User.countDocuments(cond);
    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

    const userList = await query.exec();

    const response = {
      status: "success",
      totalPageNum,
      data: userList,
    };
    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = userController;
