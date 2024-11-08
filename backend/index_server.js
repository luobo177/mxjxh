const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 引入 cors
const fs = require('fs'); // 引入 fs 模块
const https = require('https'); // 引入 https 模块
const http = require('http'); // 引入 http 模块
const path = require('path');
const db = require('./config');

const logRoutes = require('./navigation/log');
const registerRoutes = require('./navigation/register');
const TZ_indexRoutes = require('./TiaoZao/TZ_index');
const createCommodityRoutes = require('./TiaoZao/createCommodity');
const myCommodityRoutes = require('./TiaoZao/myCommodity');
const editCommodityRoutes = require('./TiaoZao/editCommodity');
const queryCommodityRouts = require('./TiaoZao/commodity_detail');
const createPlan = require('./navigation/plan');
// 加载证书和私钥
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/cuitmxjxh.top/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/cuitmxjxh.top/fullchain.pem')
};

const app = express();

// 创建 HTTPS 服务器
https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

// 创建 HTTP 服务器以重定向到 HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(80, () => {
    console.log('HTTP Server running on port 80, redirecting to HTTPS');
});

// 使用 cors 中间
app.use(cors({
    origin: ['https://www.cuitmxjxh.top', 'http://www.cuitmxjxh.top'], // 允许的来源
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
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
app.use('/', queryCommodityRouts);
app.use('/',createPlan);
// 启动服务器
// 这里不需要再调用 app.listen(80) 了，因为我们已经在上面创建了一个 HTTP 服务器来处理重定向
