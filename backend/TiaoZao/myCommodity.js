const express = require('express');
const router = express.Router();
const db = require('../config'); // Adjust the path based on your setup

// Route to get commodities for a specific user
router.get('/my-commodities', async (req, res) => {
    const userId = req.query.userId; // 获取用户 ID
    try {
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        console.log('Fetching commodities for userId:', userId);

        // 执行查询
        db.query('SELECT * FROM products WHERE seller_id = ?', [userId], (error, results) => {
            if (error) {
                console.error('Error fetching commodities:', error);
                // 返回 500 错误
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // 返回查询结果
            res.json(results); // 发送查询结果
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        // 返回 500 错误
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete-commodity/:id', (req, res) => {
    const productId = req.params.id; // 从 URL 参数中获取商品 ID
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: '数据库错误' });
        }
        res.json({ message: '商品已删除' }); // 返回删除成功的消息
    });
});


module.exports = router;
