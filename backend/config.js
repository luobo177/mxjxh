const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // 根据实际的数据库用户名
    password: 'uiorew12345',  // 根据实际的数据库密码
    database: 'tiaozao'
});

db.connect(err => {
    if (err) {
        console.error('数据库连接失败:', err);
    } else {
        console.log('数据库连接成功！');
    }
});


module.exports = db;