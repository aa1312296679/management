var mysql=require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '966119',
    database: 't2',
    port: 80
});

//导出连接池
module.exports=pool;
