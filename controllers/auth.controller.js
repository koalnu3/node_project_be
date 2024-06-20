const { response } = require('express');
const User = require('../models/User');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

const authController = {};

authController.loginWithEmail = async (req,res) =>{
}

authController.authenticate = async (req, res, next) => {
}

authController.checkAdminPermission = async (req, res, next) => {
}

module.exports = authController;