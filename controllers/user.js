const user=require(__dirname+"/../services/user.js");
//导入时间转化模块
const sd=require('silly-datetime');

module.exports.addUser=function (req,res) {
    return  res.render("user_add");
}

/**
 * 用户管理信息分页查询
 * @param req
 * @param res
 */
module.exports.usermanager=async function (req, res) {
    res.locals.title='管理系统';
    //获取客户端请求的分页
    var pagenum=req.query.page;
    //当前页的行信息起始位置
    var start;
    //当前页的行信息终止位置
    var end;

    //如果客户端没发送分页页码则默认从分页页码第一页显示
    if(pagenum==undefined){
        pagenum=1;
        start=(pagenum-1)*5;
        end=5;
    }else {
        start=(pagenum-1)*5;
        end=5;
    }

    //通过数据层对用户管理页进行分页查询并获取到当前页的所有用户信息
   var result=await user.usermanager(start,end);

    if(result.length){
        //将当前页的头部信息渲染给客户端
        res.locals.title="用户组管理信息";
        //将当前页的查询结果渲染给客户端
        res.locals.userList=result;
        //将当前页的页码渲染给客户端
        res.locals.pageNumber=parseInt(pagenum);
        //通过数据表的数据总条数和数据页的数据条数计算数据表的总页数
        //5为每页需要显示的数据条数
        res.locals.pageTotal=Math.ceil((result[0].count/5));
        //将时间转化模块渲染给客户端
        res.locals.sd=sd;
        //将渲染完毕的用户模板响应给客户端
        return  res.render("user_list");
    }else {
        return   res.send("404 访问异常");
    }
}

/**
 * 添加新用户
 * @param req
 * @param res
 */
module.exports.insertUser=async function (req,res) {
    //获取用户名
    var userName=req.body.username;
    //获取用户密码
    var userPwd=req.body.pwd;
    //获取部门Id
    var deparmentId=req.body.department;
    //获取用户组Id
    var groupId=req.body.group;
    //获取工号
    var userCode=req.body.usercode;
    //获取备注
    var description=req.body.description;
    //获取登录的Ip
    var ip=require(__dirname+'/index.js').getIp(req);

    var reuslt=await user.insertUser(userName,userPwd,deparmentId,groupId,userCode,description,ip);

    if(reuslt=="添加成功"){
        res.locals.title="用户信息";
        res.locals.userName=userName;
        res.locals.userPwd=userPwd;
        return  res.render("user_add_status");
    }else {
        console.log(reuslt);
        return  res.send("添加异常");
    }
}

/**
 * 删除指定用户
 * @param req
 * @param res
 */
module.exports.deleteUser=async function (req,res) {
    //用户Id
    var userId=req.body.userId;
    var deleteResult=await user.deleteUser(userId);
    if(deleteResult=="删除成功"){
        return res.json(JSON.stringify({result:"删除成功"}));
    }else {
        console.log(deleteResult);
        return res.json(JSON.stringify({result:"删除异常"}));
    }
}

/**
 * 修改用户信息
 * @param req
 * @param res
 */
module.exports.editUser=async function(req,res) {
    //用户Id
    var userId=req.body.userId;
    var result=await user.editUser(userId);

    if(result.length){
        res.locals.title="用户修改页";
        res.locals.user=result;
        return  res.render("user_edit");
    }else {
        return  res.send("跳转异常，无法跳转指定页");
    }
}