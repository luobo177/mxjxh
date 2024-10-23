const express = require('express');
const bodyParser = require('body-parser');
const logRoutes = require('./log');
const app = express();
const path = require('path');
// 提供 frontend 文件夹作为静态文件目录
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.json());

app.use('/',logRoutes);


// 创建示例产品数据的 API 路由（测试用）
app.get('/products', (req, res) => {
    const exampleProducts = [
        { id: 1, image: 'url_to_image_1.jpg', title: '商品 1', description: '描述 1' },
        { id: 2, image: 'url_to_image_2.jpg', title: '商品 2', description: '描述 2' },
        { id: 3, image: 'url_to_image_3.jpg', title: '商品 3', description: '描述 3' },
        { id: 4, image: 'url_to_image_4.jpg', title: '商品 4', description: '描述 4' },
        { id: 5, image: 'url_to_image_5.jpg', title: '商品 5', description: '描述 5' },
    ];
    res.json(exampleProducts); // 返回示例数据
});















const PORT=3000;
app.listen(PORT,()=>{
    console.log(`服务器正在运行端口${PORT}`);
});