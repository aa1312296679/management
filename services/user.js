//导入连接池
const sqlcon=require(__dirname+"/sqlcon.js");

/**
 * 用户信息分页查询
 * @param start
 * @param end
 */
module.exports.usermanager=function (start,end) {
    return new Promise(function (resolve, reject) {
        var sql="select *,(select count(*) from loginuser) as count from loginuser limit ?,?";
        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else {
                connection.query(sql,[start,end],function (err,result,fileds){
                    if(err) {
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
 * 添加用户信息
 * @param userName
 * @param userPwd
 * @param deparmentId
 * @param groupId
 * @param userCode
 * @param description
 * @param ip
 */
module.exports.insertUser=function (userName,userPwd,deparmentId,groupId,userCode,description,ip) {
    return new Promise(function (resolve, reject) {
        var sql="INSERT loginuser VALUES(DEFAULT(Auto),?,?,?,?,?,?,?,NOW())";
        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,[userName,userPwd,deparmentId,groupId,userCode,description,ip],function (err,result,fileds){
                    if(err) {
                        reject(err);
                    }else {
                        resolve("添加成功");
                    }
                    connection.release();
                });
            }
        });
    });
}

/**
 * 删除指定用户
 * @param id 用户id
 */
module.exports.deleteUser=function (userId) {
    return new Promise(function (resolve, reject) {
        var sql="DELETE FROM loginuser WHERE Auto=?";
        sqlcon.getConnection(function (err, connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,[userId],function (err,result,fileds){
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


