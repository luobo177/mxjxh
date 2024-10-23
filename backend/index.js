const express = require('express');
const bodyParser = require('body-parser');
const logRoutes = require('./TiaoZao/log');
const TZ_index_Routes = require('./TiaoZao/TZ_index');
const app = express();
const path = require('path');
const db = require('./config');

// 提供 frontend 文件夹作为静态文件目录
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.json());

// 根路由，指向 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 使用 log 路由
app.use('/', logRoutes);

app.use('/',TZ_index_Routes);

// 启动服务器
app.listen(3000, () => {
    console.log('服务器已运行');
});














