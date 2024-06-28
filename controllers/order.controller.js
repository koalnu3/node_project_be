const Order = require("../models/Order");
const classController = require("./class.controller");
const { randomStringGenerator } = require("../utils/randomStringGenerator");
const PAGE_SIZE = 8;

const orderController = {};

//주문생성
orderController.createOrder = async (req, res) => {
  try {
    //프론트엔드에서 데이터 보낸거 받아와
    const { userId } = req;
    const { classId, price, payMethod } = req.body;

    //order를 만들자
    const newOrder = await new Order({
      userId,
      classId,
      price,
      payMethod,
      orderNum: randomStringGenerator(),
    });

    await newOrder.save();

    let response = { status: "success" };
    response.orderNum = newOrder.orderNum;
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

//주문조회(본인주문-회원)
orderController.getOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { page } = req.query || 1;
    // 조건 정의
    const condition = { userId };
    // Order 컬렉션에서 userId가 일치하는 자료 조회 및 User 컬렉션에서 userId에 해당하는 사용자 정보 populate
    // const orderList = await Order.find({ condition }).populate({  ==> ({ condition }) 이렇게 하면 조회안됨
    const orderList = await Order.find(condition)
      .populate({
        path: "userId",
        select: "nickname email",
      })
      .populate({
        path: "classId",
        select: "name image",
      });
    // .skip((page - 1) * PAGE_SIZE)
    // .limit(PAGE_SIZE);

    // 총 문서 수를 센다
    const totalItemNum = await Order.countDocuments(condition);

    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

    console.log(userId);
    console.log(orderList);
    console.log(totalItemNum);
    console.log(totalPageNum);

    let response = { status: "success" };
    response.totalPageNum = totalPageNum;
    response.orderList = orderList;

    res.status(200).json({ status: "success", orderList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

//주문조회(전체주문-관리자)
orderController.getOrderList = async (req, res) => {
  try {
    const { page, orderNum } = req.query;

    let condition = {};
    if (orderNum) {
      cond = {
        orderNum: { $regex: orderNum, $options: "i" },
      };
    }

    const orderList = await Order.find(condition)
      .populate({
        path: "userId",
        select: "nickname email",
      })
      .populate({
        path: "classId",
        select: "name image",
      })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const totalItemNum = await Order.countDocuments(condition);
    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

    let response = { status: "success" };
    response.totalPageNum = totalPageNum;
    response.orderList = orderList;

    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

//Id로 주문조회
orderController.getOrderListById = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ status: "fail", error: "유저를 선택해주세요" });
    }

    let condition = { userId : userId };

    const orderList = await Order.find(condition)
      .populate({
        path: "userId",
        select: "nickname email",
      })
      .populate({
        path: "classId",
        select: "name image",
      });

    let response = { status: "success" };
    response.orderList = orderList;

    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

//주문수정(환불-관리자)
orderController.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        status,
      },
      { new: true }
    );
    if (!order) throw new Error("Can't find order");

    let response = { status: "success" };
    response.data = order;

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = orderController;
