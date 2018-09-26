const departments=require(__dirname+"/../services/departments.js");

/**
 * 添加机构信息页页面展示
 * @param req
 * @param res
 */
module.exports.adddepart=function(req,res){
   return res.render('department_add');
}

/**
 * 添加机构信息
 **/
module.exports.adddepartPost=async function(req,res){
    //获取用户提交的添加信息
    var departName=req.body.departname;
    var departTip=req.body.description;
    var departCode=req.body.departcode;

    //调用数据访问层的机构信息添加方法将信息添加到数据库
    var insertResult=await departments.addDepartment(departName,departTip,departCode);

    //获取数据访问层的添加结果
    if(insertResult=="添加成功"){
        res.locals.title="机构的添加状态";
        res.locals.addStatus="添加成功";
       return res.render("department_add_status");
    }else {
        res.locals.title="机构的添加状态";
        res.locals.addStatus="添加失败，数据异常，请重试";
      return  res.render("department_add_status");
    }
}

/**
 * 分页查询
 **/
module.exports.departList=async function(req,res) {
    //获取客户端请求的分页
    var pagenum=req.query.page;

    //star 当前页的起始行
    var start;
    //end 当前页的终止行
    var end;

    //如果客户端没发送分页页码则默认从分页页码第一页显示
    if(pagenum==undefined){
        pagenum=1;
        start=(pagenum-1)*5;
        end=5;
    }else {
        pagenum=parseInt(req.query.page);
        start=(pagenum-1)*5;
        end=5;
    }
   const result=await departments.departList(start,end);
    if(result.length){
        res.locals.title="机构信息";
        //将当前页的查询结果渲染给客户端
        res.locals.departmentList=result;
        //将当前页的页码渲染给客户端
        res.locals.pageNumber=parseInt(pagenum);
        //计算数据表的总页数
        res.locals.pageTotal=Math.ceil((result[0].count/5));
       return res.render("department_list");
    }else {
        console.log(result);
    }
}

/**
 * 删除指定的机构信息
 * @param req
 * @param res
 */
module.exports.deletedepart=async function (req,res) {
    var departmentId=req.body.departmentId;
    var deleteResult=await departments.deletepart(departmentId);
    if(deleteResult=="删除成功"){
       return res.send("删除成功");
    }else {
        console.log(deleteResult);
       return res.send("删除异常");
    }
}

/**
 * 显示待修改的机构信息
 * @param req 用户请求
 * @param res 服务器端响应对象
 */
module.exports.editdepart=async function (req,res) {
    //获取待修改的机构信息的机构Id
    var departmentId=req.query.departmentId;
    //通过数据访问层的机构信息查询方法获取到待修改机构的机构详情
    var result=await departments.editdepart(departmentId);

    if(result.length){
        res.locals.title="机构添加页";
        res.locals.department=result;
      return  res.render("department_edit");
    }else {
      return  res.send("跳转异常，无法跳转指定页");
    }
}

/**
 * 查询机构信息
 * @param req
 * @param res
 */
module.exports.allDepartment=async function (req,res) {
   //获取数据访问层的机构信息
   var result=await departments.allDepartment();
   //如果已获获取到机构信息
   if(result.length){
       //将机构信息添加至对中并以json格式响应给客户端
      return res.json(JSON.stringify({departmentList:result}));
   }else {
      return console.log(result);
   }
}

/**
 * 更新机构信息
 * @param req
 * @param res
 */
module.exports.updateDepart=async function (req,res) {
    //获取用户提交的更新信息
    var departName=req.body.departname;
    var departTip=req.body.description;
    var departCode=req.body.departcode;
    var departId=req.body.departmentId;
    //将用户提交的更新信息进行更新
    var result=await departments.updateDepart(departName,departTip,departCode,departId);
    //如果数据访问层更新成功
   if(result=="更新成功"){
       res.locals.title="更新结果";
       res.locals.updateStatus="更新成功";
       return  res.render("department_update_status");
   }else {
       res.locals.title="更新结果";
       res.locals.updateStatus="更新异常 404";
       return  res.render("department_update_status");
   }
}

/**
 * 批量删除机构信息
 */
module.exports.deleteAllDepartments=async function(req, res) {
   //当前遍历到的机构Id
   var departId=0;

   //获取所有机构Id
    var departsId=req.body.departmentsId;

   //遍历所有机构Id
   for(var i=0;i<departsId.length;i++) {
       departId = parseInt(departsId[i].departmentId);
       //根据当前遍历到的机构Id进行删除
       var result = await departments.deletepart(departId);
       if (result == "删除成功") {
           continue;
       } else {
           console.log(result);
           return  res.json(JSON.stringify({result:"删除异常"}));
           break;
       }
   }

   if (i == departsId.length) {
       return res.json(JSON.stringify({result:"删除成功"}));
   }
}