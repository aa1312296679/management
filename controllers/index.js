const  svgCaptcha=require('svg-captcha');
const indexServer=require(__dirname+"/../services/index.js");
const sd=require('silly-datetime');

/**
 * 主页登陆记录验证
 * @param req
 * @param res
 */
module.exports=function(req,res){
   //渲染登陆页的头部信息
    res.locals.title="登陆";
   //如果服务器端有该客户端的登陆记录
    if(req.session.userName){
        //让客户端重新向服务器端发送请求并跳转至首页
        return res.redirect("/login");
    }else {
        //回到登陆页
        return res.render('sys_login');
    }
}

/**
 * 生成验证码
 * @param req
 * @param res
 */
module.exports.getCaptcha=function (req, res) {
    var captcha = svgCaptcha.create({
        // 翻转颜色
        inverse: false,
        // 字体大小
        fontSize: 36,
        // 噪声线条数
        noise: 2,
        // 宽度
        width: 80,
        // 高度
        height: 30,
        size:5
    });
    // 忽略验证码的大小写，将验证码保存至服务器端的session
    req.session.captcha = captcha.text.toLowerCase();
    // 使客户端生成一个验证码的session cookie
    res.cookie('captcha', req.session.captcha);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.write(String(captcha.data));
    return res.end();
}

/**
 * 验证客户端的验证码
 * @param req
 * @param res
 */
module.exports.checkCode=function (req,res) {
    //获取客户端提交的验证码
    var code=req.body.code;
    //如果服务器端存在验证码
    if(req.session.captcha){
        //验证时忽略大小写
        if(req.session.captcha.toLowerCase()==code){
            //返回验证成功的json
         return res.json(JSON.stringify({codeResult:true}));
        }else {
            //返回验证失败的json
        return res.json(JSON.stringify({codeResult:false}));
        }
    }
}

/**
 * 登陆处理
 * 用于判断用户输入的账号和密码是否正确
 * @param req
 * @param res
 */
module.exports.checkLogin=async function (req, res) {
    //获取客户端提交的用户名和密码
    var userName=req.body.username;
    var userPwd=req.body.password;
    //如果客户端未通过post访问首页，通过get访问首页
    if(userName==undefined&&userPwd==undefined){
        // 判断用户信息的session是否存在
        if(req.session.userName){
            //处理用户的登录结果
            checkIndexInfor(res,req.session.userName,false);
        }else {
            //处理用户的登录结果
            checkIndexInfor(res,null);
        }
    }else {
            //通过数据层查询登录信息是否存在
            let result=await indexServer.checkLogin(userName,userPwd);
            //如果登录信息存在则登录成功
            if(result.length>0){
                //创建服务器端的用户信息的session存储用户信息
                req.session.userName=userName;
                //使客户端生成一个用户信息的sessionCookie
                res.cookie('userName', req.session.userName);
                //处理用户的登录结果
                checkIndexInfor(res,result,true);
                 //获取客户端ip
                 let ip=getIp(req);
                 //更新登陆用户的用户Ip
                 indexServer.upLoginIp(ip,userName).
                 then(res=>{console.log(res)}).
                 catch(err=>{console.log(err)});
            }else {
             return res.send("账号密码错误");
        }
    }

}

/**
 * 退出登陆
 **/
module.exports.loginout=function(req, res) {
    req.session.destroy(function (err) {
        if(err){
          return res.json(JSON.stringify({msg:"退出登录失败"}));
        }else {
           //清除客户端的用户信息的sessionCookie
            res.clearCookie("userName");
           return res.json(JSON.stringify({msg:"退出登陆成功"}));
        }
    });
}

/**
 * 获取客户端的ip
 */
function getIp(req) {
    //获取客户端所有的ip信息
    var ip=req.headers.origin;
    //正则截取客户端ip信息的ip
    ip=ip.replace(/(http|https):\/\//,'');
    return ip;
}

/**
 * 处理用户的登录
 * @ param res 响应对象
 * @ param userName sql的用户信息查询结果或session中的用户信息
 * @ param loginMeans 用户的登陆方式 true为登录页登录 false为session登录
 */
function checkIndexInfor(res,userName,loginMeans){
    //渲染用户信息
    res.locals.title="欢迎来到后台管理系统";
    //如果用户信息不存在
    if(userName==null){
      //重定向到登陆页，让用户重新登陆
      return res.redirect("/");
    }else {
        if(loginMeans==true){
            //通过查询结果获取到用户名并响应到客户端
            res.locals.userName=userName[0].userName;
        }else {
            //通过
            res.locals.userName=userName;
        }

        //获取当前时间
        let currentDate=new Date();
        //定义星期
        let  week=['一','二','三','四','五','六','日'];
        //渲染时间
        res.locals.year=sd.format(currentDate,"YYYY");
        res.locals.month=sd.format(currentDate,"MM");
        res.locals.day=sd.format(currentDate,"DD");
        //星期下标
        let  weekIndex;
        //根据当前星期计算星期值的下标
        if(currentDate.getDay()==0){
            weekIndex=6;
        }else {
            weekIndex=currentDate.getDay()-1;
        }
        //根据当前星期找到对应的星期格式
        res.locals.week=week[weekIndex];
        return res.render("sys_index");
    }
}

module.exports.getIp=getIp;