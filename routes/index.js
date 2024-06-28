const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const authApi = require("./auth.api");
const classApi = require("./class.api");
const orderApi = require("./order.api");
const adminApi = require("./admin.api");
const categoryApi = require("./category.api");

router.use("/user", userApi);
router.use("/auth", authApi);
router.use("/class", classApi);
router.use("/order", orderApi);
router.use("/admin", adminApi);
router.use("/category", categoryApi);

module.exports = router;
