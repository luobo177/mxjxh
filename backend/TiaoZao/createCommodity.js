const express = require('express');
const db = require('../config');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname,'uploads');
        console.log('Upload path:', uploadPath); // 打印路径
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename);
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
    if (!req.file) {
        return res.status(400).json('请上传有效的文件');
    }
    const imagePath = 'TZuploads/' + req.file.filename; // 确保正确设置图片路径
    console.log('上传成功:', imagePath);


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
