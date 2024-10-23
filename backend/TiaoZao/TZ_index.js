const express = require('express'); // 引入 express
const router = express.Router(); // 创建一个新的路由实例
const db = require("../config"); // 引入数据库配置

// 定义获取商品数据的路由
router.get('/products', (req, res) => {
    const query = 'SELECT * FROM products'; // SQL 查询
    db.query(query, (err, results) => {
        if (err) {
            console.error('查询商品数据失败:', err);
            res.status(500).send('数据库查询失败'); // 发送错误响应
            return;
        }
        res.json(results);  // 返回 JSON 格式的商品数据
    });
});

// 导出路由
module.exports = router; // 正确导出 router 实例
