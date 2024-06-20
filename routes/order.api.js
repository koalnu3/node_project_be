const express = require("express");
const orderController = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

//주문생성
router.post("/", authController.authenticate, orderController.createOrder);

//주문조회
router.get("/me", authController.authenticate, orderController.getOrder);

//주문수정(관리자환불?)
router.put(
  "/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  orderController.updateOrder
);

module.exports = router;
