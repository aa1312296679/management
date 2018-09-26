const express = require('express');
const router = express.Router();
const user=require(__dirname+"/../controllers/user.js");

/**
 * 添加用户页
 */
router.get("/adduser",function (req, res, next) {
    user.addUser(req,res);
});

/**
 * 用户信息分页处理
 */
router.get("/usermanager",function (req, res, next) {
    user.usermanager(req,res)
});

/**
 * 添加用户
 */
router.post("/insertuser",function (req, res, next) {
    user.insertUser(req,res);
});

/**
 * 删除单个用户
 */
router.post("/deleteUser",function (req, res, next) {
    user.deleteUser(req,res);
});

/**
 * 修改用户信息
 */
router.get("/editUser",function (req, res, next) {
    user.editUser(req,res);
});

module.exports = router;
