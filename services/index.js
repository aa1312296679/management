//导入连接池
const sqlcon=require(__dirname+"/sqlcon.js");

/**
 * 查询用户信息
 * @param userName 用户名
 * @param userPwd  用户密码
 */
module.exports.checkLogin= function (userName,userPwd) {
       return new Promise(function (resolve, reject){
            var sql=" SELECT * FROM loginuser WHERE userName=? and `passWord`=?";
            sqlcon.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                } else {
                    connection.query(sql, [userName, userPwd], function (err, result, fileds) {
                        if (err) {
                            reject(err);
                        }
                        connection.release();
                        resolve(result);
                    });
                }
            });
        });
}

/**
 * 根据客户端IP更新登陆用户的登陆Ip
 * @param ip 登陆用户的登陆Ip
 * @param username 登陆用户的用户名
 */
module.exports.upLoginIp=function (ip,username) {
   return new Promise(function(resolve, reject){
        var sql = "UPDATE loginuser SET loginIp=? WHERE userName=?";
        sqlcon.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                //根据当前登陆的用户名，将该用户名的ip更新为该ip
                connection.query(sql, [ip, username], function (err, result, fileds) {
                    if (err) {
                        reject(err);
                    }
                    //释放更新登陆用户的登陆IP的mysql连接
                    connection.release();
                    resolve("更新成功");
                });
            }
        });
    });
}









