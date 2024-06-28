const express = require('express')
const authController = require('../controllers/auth.controller')
const classController = require('../controllers/class.controller')
const router = express.Router()

//유저id로 클래스조회(관리자)
router.get(
    "/", 
    authController.authenticate, 
    authController.checkAdminPermission,
    classController.getClassByUserId
);


module.exports = router;