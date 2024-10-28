const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./config');


const logRoutes = require('./TiaoZao/log');
const TZ_indexRoutes = require('./TiaoZao/TZ_index');
const registerRoutes = require('./TiaoZao/register');
const createCommodityRoutes = require('./TiaoZao/createCommodity');
const myCommodityRoutes = require('./TiaoZao/myCommodity');
const editCommodityRoutes = require('./TiaoZao/editCommodity');

// 提供 frontend 文件夹作为静态文件目录
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.json());

// 根路由，指向 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
//把uploads文件放入静态路径
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// 使用 log 路由
app.use('/', logRoutes);

app.use('/',TZ_indexRoutes);

app.use('/',registerRoutes);

app.use('/',createCommodityRoutes);

app.use('/',myCommodityRoutes);

app.use('/',editCommodityRoutes);

// 启动服务器
app.listen(3000, () => {
    console.log('服务器已运行');
});














