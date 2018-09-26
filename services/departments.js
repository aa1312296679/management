//导入连接池
const sqlcon=require(__dirname+"/sqlcon.js");

/**
 * 添加机构信息
 */
module.exports.addDepartment=function (departName,departTip,departCode) {
   return new Promise(function (resolve,reject) {
       var sql="INSERT INTO department (departName,departTip,departCode) VALUES(?,?,?);";
       sqlcon.getConnection(function (err, connection){
           if(err){
               reject(err);
           }else{
               connection.query(sql,[departName,departTip,departCode],function (err,result,fileds){
                   if(err){
                       reject(err);
                   }else{
                       resolve("添加成功");
                   }
                   connection.release();
               });
           }
       });
    });
}

/**
 ** 对指定页码进行分页查询
 * @param star 分页计算的数据的起始行
 * @param end  分页计算的数据结束行
 * */
module.exports.departList=function (start,end) {
    return new Promise(function (resolve,reject) {
        //通过页码分页查询指定页码的数据信息
        var sql="select *,(select count(*) from department) as count from department limit ?,?";

        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else {
                connection.query(sql,[start,end],function (err,result,fileds){
                    if(err){
                        reject(err);
                    }else {
                        connection.release();
                        resolve(result);
                    }
                });
            }
        });
    });
}

/**
 * 删除指定机构
 * @param deparmentId 机构Id
 **/
module.exports.deletepart=function (deparmentId) {
   return new Promise(function (resolve, reject){
        var sql="DELETE FROM department WHERE departmentId=?";
        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,[deparmentId],function (err,result,fileds){
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
 * 查询待修改机构的机构信息
 * @param departmentId
 */
module.exports.editdepart=function (departmentId) {
    return new Promise(function (resolve, reject){
        //根据机构ID查询机构该机构的详细信息
        var sql="SELECT * FROM department WHERE  departmentId=?";
        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,[departmentId],function (err,result,fileds){
                    if(err){
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

/**
 * 查询机构信息
 */
module.exports.allDepartment=function () {
   return new Promise(function (resolve,reject){
       var sql = "SELECT * FROM department";
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
 **更新机构
 * */
module.exports.updateDepart=function (departName,departTip,departCode,departId) {
    return new Promise(function (resolve,reject){
        //根据信息ID更新指定行的详细信息
        var sql="UPDATE department SET departName = ?,departTip = ?,departCode = ? WHERE departmentId = ?";
        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,[departName,departTip,departCode,departId],function (err,result,fileds){
                    if(err){
                        reject(err);
                    }else {
                        resolve("更新成功");
                    }
                    connection.release();
                });
            }
        });
    });
}

