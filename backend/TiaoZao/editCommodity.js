const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../config');

// 获取单个商品信息
router.get('/get-commodity', (req, res) => {
    const productId = req.query.productId;
    if(!productId){
        return res.status(400).json({error:'缺少商品id'});
    }
    const query = 'SELECT * FROM products WHERE id = ?';

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('查询商品失败:', err);
            return res.status(500).json({ error: '查询失败' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: '商品未找到' });
        }
    });
});

// 更新商品信息
router.post('/update-commodity', (req, res) => {
    const { id, name, price, description } = req.body;
    const query = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';

    db.query(query, [name, price, description, id], (err, results) => {
        if (err) {
            console.error('更新商品失败:', err);
            return res.status(500).json({ error: '更新失败' });
        }
        if (results.affectedRows > 0) {
            res.json({ message: '商品更新成功' });
        } else {
            res.status(404).json({ error: '商品未找到' });
        }
    });
});

// 导出路由
module.exports = router;
