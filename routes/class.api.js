const express = require("express");
const authController = require("../controllers/auth.controller");
const classController = require("../controllers/class.controller");
const router = express.Router();

//클래스등록 (강사권한확인?)
router.post("/", authController.authenticate, classController.createClass);
router.get("/my/:id", authController.authenticate, classController.getMyClass);

//클래스조회
router.get("/", classController.getClass);

//클래스상세조회
router.get("/:id", classController.getClassById);

//유저id로 클래스조회(관리자)
router.get(
  "/admin",
  authController.authenticate,
  classController.getClassByUserId
);

//클래스수정
router.put("/:id", authController.authenticate, classController.updateClass);

//클래스삭제
router.delete(
  "/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  classController.deleteClass
);

module.exports = router;
