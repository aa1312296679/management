const express = require('express');
const router = express.Router();
const group=require(__dirname+"/../controllers/group.js");

/**
 用户组添加页展示
*/
router.get('/addgroup', function(req, res, next) {
   group.showAddgroup(req,res);
});

/**
 * 添加用户组信息
 */
router.post('/addgroup',function (req,res,next) {
    group.addgroup(req,res);
});

/**
 * 修改用户组信息
 */
router.get('/editgroup',function (req, res, next) {
   group.editGoup(req,res);
});

/**
 * 分页查询用户组管理
 */
router.get("/grouplist",function (req, res, next) {
   group.grouplist(req,res);
});

/**
 * 查询所有的用户组信息
 */
router.get("/allgrouplist",function (req,res) {
    group.allgrouplist(req,res);
});

/**
 * 删除部门的单行数据
 */
router.post("/delGroup",function (req, res) {
    group.delGroup(req,res);
});

/**
 * 批量删除部门信息
 */
router.post("/deleteAllGroups",function (req, res) {
   group.deleteAllGroups(req,res);
});

module.exports = router;