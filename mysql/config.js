// 连接MySQL数据库
var mysql = require('mysql');
var dbconfig = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'dustin-db'
});

module.exports = dbconfig;