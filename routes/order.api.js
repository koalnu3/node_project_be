const express = require("express");
const orderController = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

//주문생성
router.post("/", authController.authenticate, orderController.createOrder);

//주문조회(전체주문-관리자)
// router.get(
//   "/",
//   authController.authenticate,
//   authController.checkAdminPermission,
//   orderController.getOrderList
// );

//주문조회(본인주문-회원)
router.get("/me", authController.authenticate, orderController.getOrder);

//id로 주문조회(관리자)
router.get("/", authController.authenticate, orderController.getOrderListById);

//주문수정(환불-관리자)
router.put(
  "/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  orderController.updateOrder
);

router.get(
  "/byUserAndClass",
  authController.authenticate,
  orderController.getOrderByUserAndClass
);

module.exports = router;
