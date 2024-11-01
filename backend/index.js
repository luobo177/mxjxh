const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 引入 cors
const app = express();
const path = require('path');
const db = require('./config');

const logRoutes = require('./log');
const TZ_indexRoutes = require('./TiaoZao/TZ_index');
const registerRoutes = require('./register');
const createCommodityRoutes = require('./TiaoZao/createCommodity');
const myCommodityRoutes = require('./TiaoZao/myCommodity');
const editCommodityRoutes = require('./TiaoZao/editCommodity');
const queryCommodityRouts = require('./TiaoZao/commodity_detail');

// 使用 cors 中间件
app.use(cors({
    origin: 'http://www.cuitmxjxh.top', // 允许的来源
    methods: ['GET', 'POST','DELETE'], // 允许的方法
}));

// 提供 frontend 文件夹作为静态文件目录
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.json());

// 根路由，指向 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 把 uploads 文件夹放入静态路径
const uploadPath = path.join(__dirname, 'TiaoZao', 'uploads');
app.use('/TZuploads', express.static(uploadPath));

// 输出 TZuploads 的路径
console.log('TZuploads static path:', uploadPath);

// 使用路由
app.use('/', logRoutes);
app.use('/', TZ_indexRoutes);
app.use('/', registerRoutes);
app.use('/', createCommodityRoutes);
app.use('/', myCommodityRoutes);
app.use('/', editCommodityRoutes);
app.use('/',queryCommodityRouts);

// 启动服务器
app.listen(80, '0.0.0.0', () => {
    console.log('服务器已运行');
});