const express = require('express');
const db = require('../config');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// 配置 multer 存储
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueFilename = Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename); // 只存文件名
    }    
});

const upload = multer({ storage: storage });

// SQL 插入语句
const createCommodity = `
    INSERT INTO products (name, price, description, seller_contact, seller_id, image) 
    VALUES (?, ?, ?, ?, ?, ?)
`;

// 使用 POST 请求来创建商品
router.post('/create-commodity', upload.single('image'), (req, res) => {
    const { name, price, description, seller_contact, seller_id } = req.body;
    const imagePath = req.file ? req.file.path : null; // 获取上传的文件路径

    // 验证请求体中的必要字段
    if (!name || !price || !seller_contact || !seller_id || !imagePath) {
        return res.status(400).json('请确保所有字段都已填写');
    }

    // 执行插入操作
    db.query(createCommodity, [name, price, description, seller_contact, seller_id, imagePath], (err, result) => {
        if (err) {
            console.error('插入商品失败:', err);
            return res.status(500).json('插入商品失败');
        }
        res.json({ success: true });
    });
});

module.exports = router;
