//导入Dao层的用户组模块
const group=require(__dirname+"/../services/group.js");

/**
 * 添加用户组页面展示
 * @param req
 * @param res
 */
module.exports.showAddgroup=function(req,res){
   return res.render('group_add');
}

/**
 * 新增用户组逻辑处理
 */
module.exports.addgroup=async function (req, res) {
    var groupName=req.body.groupname;
    var groupPower=req.body.grouppower;
    var upResult=await group.addgroup(groupName,groupPower);

    if(upResult.result){
      return res.json(JSON.stringify(upResult));
    }else {
       return res.json(JSON.stringify({result:"新增异常，404"}));
    }
}


/**
 * 删除部门的单行数据 逻辑处理
 */
module.exports.delGroup=async function(req,res){
    //获取部门Id
    var groupId=req.body.groupId;
    var delResult=await group.delGroup(groupId);
    if(delResult=="删除成功"){
        return res.send("删除成功");
    }else {
        console.log(delResult);
        return res.send("删除异常");
    }
}

/**
 * 用户组查询
 * */
module.exports.grouplist=async function (req,res) {
    //获取客户端请求的分页
    var pagenum=req.query.page;
    //当前页的数据条数
    //当前页的起始
    var start;
    //当前页的终止
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
    var result=await group.grouplist(start,end);
    if(result.length){
        //将当前页的头部信息渲染给客户端
        res.locals.title="用户组管理信息";
        //将当前页的查询结果渲染给客户端
        res.locals.groupList=result;
        //将当前页的页码渲染给客户端
        res.locals.pageNumber=parseInt(pagenum);
        //通过数据表的数据总条数和数据页的数据条数计算数据表的总页数
        res.locals.pageTotal=Math.ceil((result[0].count/5));
        //将渲染完毕的用户组管理模板响应给客户端
        return res.render("group_list");
    }else {
        return  console.log(result);
    }
}

/**
 * 查询所有的用户组信息
 */
module.exports.allgrouplist=async function(req,res) {
    var result=await group.allgrouplist();
    if(result.length){
        return res.json(JSON.stringify({groupList:result}));
    }else {
        return console.log(result);
    }
}

/**
 * 批量删除部门信息
 */
module.exports.deleteAllGroups=async function(req,res) {
    //获取需要批量删除的部门信息
    var groupsId=req.body.groupId;

    //当前遍历到的部门Id
    var groupId=0;

    //遍历所有的部门Id
    for(var i=0;i<groupsId.length;i++) {
        groupId = parseInt(groupsId[i].groupId);
        //根据当前遍历到的部门Id删除指定的部门
        var result = await group.delGroup(groupId);
        if (result == "删除成功") {
            continue;
        } else {
            console.log(result);
            return  res.json(JSON.stringify({result:"删除异常"}));
            break;
        }
    }
    if (i == groupsId.length) {
        return res.json(JSON.stringify({result:"删除成功"}));
    }
}

/**
 * 修改部门信息
 */
module.exports.editGoup=async function(req,res) {
    //获取需要修改的部门Id
    var groupId=req.query.groupId;
    //通过数据层查询待修改部门的所有部门信息
    var  result=await group.groupId(groupId);

    //将部门信息响应到客户端
    res.locals.groupInfor=result;
    //将部门修改的模板响应到客户端
    return res.render("group_edit");
}