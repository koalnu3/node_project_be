const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

//회원가입
router.post('/', userController.createUser);

//회원정보조회
router.get(
    '/me', 
    authController.authenticate, 
    userController.getUser
);

//관리자 -> 전체유저 조회
router.get(
    '/', 
    authController.authenticate,
    authController.checkAdminPermission, 
    userController.getUserList
);

//관리자 -> 유저수정
router.put(
    '/:id', 
    authController.authenticate,
    authController.checkAdminPermission,  
    userController.updateUser
);

module.exports = router;