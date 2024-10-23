const express = require('express');
const bodyParser = require('body-parser');
const logRoutes = require('./log');
const app = express();
const path = require('path');
const db=require('./config');
// 提供 frontend 文件夹作为静态文件目录
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.json());

app.use('/',logRoutes);


// 创建示例产品数据的 API 路由（测试用）
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            console.error('查询商品数据失败:', err);
            res.status(500).send('数据库查询失败');
            return;
        }
        res.json(results);  // 返回 JSON 格式的商品数据
    });
});















const PORT=3000;
app.listen(PORT,()=>{
    console.log(`服务器正在运行端口${PORT}`);
});