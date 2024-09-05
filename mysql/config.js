// 连接MySQL数据库
var mysql = require('mysql');
var dbconfig = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'dustin-db'
});

// 测试连接
dbconfig.connect(function (err) {
    if (err) {
        console.log('MySql is Connection Fail');
    } else {
        console.log('MySql is Connection Success');
    }
});

module.exports = dbconfig;