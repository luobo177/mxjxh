const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // 根据实际的数据库用户名
    password: 'uiorew12345',  // 根据实际的数据库密码
    database: 'tiaozao'
});

module.exports = db;