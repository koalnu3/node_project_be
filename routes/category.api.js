const express = require("express");
const authController = require("../controllers/auth.controller");
const categoryController = require("../controllers/category.controller");
const router = express.Router();

//클래스등록 (강사권한확인?)
router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  categoryController.createCategory
);

//클래스조회
router.get("/", categoryController.getCategory);

module.exports = router;
