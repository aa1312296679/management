const express = require('express');
const router = express.Router();
//导入登陆主页的逻辑处理模块
const controlIndex=require(__dirname+'/../controllers/index.js');

/**
*  登陆首页的请求处理
* */
router.get('/', function(req, res, next) {
    //验证主页的登陆记录
    controlIndex(req,res);
});

/**
 * 生成验证码
 */
router.get('/getCaptcha',function (req, res, next) {
    //生成登陆页的验证码
    controlIndex.getCaptcha(req,res);
});

/**
 * 验证客户端的验证码
 */
router.post('/checkCode',function (req, res, next) {
    //验证客户端的验证码
    controlIndex.checkCode(req,res);
});

/**
 * 登陆主页请求处理
 */
router.use("/login",function (req, res, next) {
   controlIndex.checkLogin(req,res);
});

/**
 * 清除登录session
 */
router.get("/loginout",function (req, res, next){
    controlIndex.loginout(req,res);
});

module.exports = router;
