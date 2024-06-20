const express = require('express')
const authController = require('../controllers/auth.controller')
const classController = require('../controllers/class.controller')
const router = express.Router()

//클래스등록 (강사권한확인?)
router.post('/',
    authController.authenticate, 
    authController.checkAdminPermission, 
    classController.createClass
);

//클래스조회
router.get('/', classController.getClass);

//클래스상세조회
router.get("/:id", classController.getClassById);

//클래스수정
router.put('/:id', 
    authController.authenticate, 
    authController.checkAdminPermission,
    classController.updateClass
);

//클래스삭제
router.delete(
    "/:id",
    authController.authenticate,
    authController.checkAdminPermission,
    classController.deleteClass
);

module.exports = router;