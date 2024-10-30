const express = require('express');
const router = express.Router();
const db = require("../config");

router.get('/queryProductById', (req, res) => {
    const id = req.query.id; // 获取查询参数中的 id
    console.log(id);
    const query = 'SELECT * FROM products WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Database query error:", err); // 打印错误信息以便调试
            return res.status(500).send("find product err");
        }
        if (result.length === 0) {
            return res.status(404).send("Product not found"); // 如果没有找到产品，返回 404
        }
        res.json(result);
    });
});

module.exports = router;
