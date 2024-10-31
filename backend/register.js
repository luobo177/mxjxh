const express = require('express');
const router = express.Router();
const db = require('./config');  // 数据库配置

router.post('/register', (req, res) => {
    const { username, password, contact } = req.body;

    console.log('接收到的注册信息:', { username, password, contact }); // 打印接收到的值

    // 检查用户名是否已存在
    const checkUserQuery = 'SELECT * FROM user WHERE name = ?';
    db.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            console.error('查询用户失败:', err);
            return res.status(500).json({ success: false, message: '数据库查询失败' });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: '用户名已存在' });
        } 

        // 插入新用户
        const insertUserQuery = 'INSERT INTO user (name, password, contact) VALUES (?, ?, ?)';
        db.query(insertUserQuery, [username, password, contact], (err, results) => {
            if (err) {
                console.error('用户注册失败:', err);
                return res.status(500).json({ success: false, message: '注册失败，请稍后再试' });
            }
            res.json({ success: true });
        });
    });
});


module.exports = router;
