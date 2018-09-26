//导入连接池
const sqlcon=require(__dirname+"/sqlcon.js");

/**
 * 添加部门
 * @param groupName 部门名称
 * @param power     部门权限
 */
module.exports.addgroup=function (groupName,power) {
   return new Promise (function (resolve,reject){
       var sql="INSERT INTO `group` VALUES(DEFAULT(groupId),?,?)";
       sqlcon.getConnection(function (err, connection){
           if(err){
               reject(err);
           }else {
               connection.query(sql,[groupName,power],function (err,result,fileds){
                   if(err){
                       reject(err);
                   }else {
                       resolve({result:"添加成功"});
                   }
                   connection.release();
               });
           }
       });
   });
}

/**
 * 查询指定页的所有部门信息
 * @param start 当前页的起始行
 * @param end   当前页的结束行
 */
module.exports.grouplist=function (start, end) {
   return new Promise(function (resolve,reject) {
       var sql="select *,(select count(*) from `group`) as count from `group` limit ?,?";
       sqlcon.getConnection(function (err, connection){
           if(err){
               reject(err);
           }else {
               connection.query(sql,[start,end],function (err,result,fileds){
                   if(err){
                       reject(err);
                   }else {
                       resolve(result);
                   }
                   connection.release();
               })
           }
       });
   });
}

/**
 * 查询所有的用户组信息
 */
module.exports.allgrouplist=function () {
    return new Promise(function (resolve,reject){
        var sql = "SELECT * FROM `group`";
        sqlcon.getConnection(function (err, connection) {
            if(err){
                reject(err);
            }else {
                connection.query(sql,function (err,result,fileds){
                    if(err){
                        reject(err);
                    }else {
                        resolve(result);
                    }
                    connection.release();
                });
            }
        });
    });
}

/**
 * 删除部门
 * @param groupId 部门Id
 */
module.exports.delGroup=function (groupId) {
    return new  Promise(function (resolve,reject){
        var sql="DELETE FROM `group` WHERE groupId=?";
        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,[groupId],function (err,result,fileds){
                    if(err){
                        reject(err);
                    }else{
                        resolve("删除成功");
                    }
                    connection.release();
                });
            }
        });
    });
}

/**
 * 根据部门Id查询指定部门的所有部门信息
 * @param grooupId 部门id
 */
module.exports.groupId=function (groupId) {
    return new Promise(function (resolve, reject) {
       var sql="SELECT * FROM `group` WHERE groupId=?";

        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,[groupId],function (err,result,fileds){
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                });
            }
        });
    });
}
