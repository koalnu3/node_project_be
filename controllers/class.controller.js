const Class = require("../models/Class");
const mongoose = require('mongoose');
const PAGE_SIZE = 8;
const classController = {};

classController.createClass = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      curriculum,
      price,
      notice,
      categoryId,
      userId,
    } = req.body;

    const newClass = new Class({
      name,
      description,
      image,
      curriculum,
      price,
      notice,
      categoryId,
      userId,
    });

    await newClass.save();
    res.status(200).json({ status: "success", newClass });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

classController.getClass = async (req, res) => {
  try {
    const { page = 1, name, category, sortBy } = req.query;
    let response = { status: "success" };

    // 조건문 작성
    const cond = {
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(category && { category: { $in: [category] } }),
    };

    // 정렬 기준 설정
    let sortCriteria = {};
    if (sortBy === "likes") {
      sortCriteria = { likes: -1 };
    } else if (sortBy === "createdAt") {
      sortCriteria = { createdAt: -1 };
    }

    // 페이지네이션과 정렬 추가
    const query = Class.find(cond)
      .sort(sortCriteria) // 동적으로 정렬 기준 설정
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const totalItemNum = await Class.countDocuments(cond);
    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

    const classList = await query.exec();

    response = {
      ...response,
      totalPageNum,
      data: classList,
    };

    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

classController.getMyClass = async (req, res) => {
  try {
    const userId = req.params.id;
    let response = { status: "success" };
    const myClass = await Class.find({ userId: userId });
    //TODO 살펴보기
    // .skip((page - 1) * PAGE_SIZE)
    // .limit(PAGE_SIZE);

    // const totalItemNum = await Class.countDocuments(cond);
    // const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
    // const classList = await user.exec();

    response = {
      ...response,
      // totalPageNum,
      data: myClass,
    };
    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

classController.updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { name, description, image, curriculum, price, categoryId, userId } =
      req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { name, description, image, curriculum, price, categoryId, userId },
      {
        new: true,
      }
    );
    if (!updatedClass) throw new Error("No item found");

    res.status(200).json({ status: "success", updatedClass });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

//클래스 삭제하기
classController.deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const targetClass = await Class.findByIdAndUpdate(
      { _id: classId },
      { isDeleted: true }
    );
    if (!targetClass) throw new Error("No item found");
    res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

classController.getClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    // 클래스 찾기 및 likes 값 1 증가
    const targetClass = await Class.findByIdAndUpdate(
      classId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!targetClass) throw new Error("No item found");
    res.status(200).json({ status: "success", data: targetClass });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

//유저ID로 클래스리스트 조회
classController.getClassByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId)
    if (!userId) throw new Error("User not found");

    const classes = await Class.find({ userId });

    res.status(200).json({ status: "success", data: classes });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};


module.exports = classController;
