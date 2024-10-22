const express = require('express');
const bodyParser = require('body-parser');
const logRoutes = require('./log');
const app = express();

// 提供 frontend 文件夹作为静态文件目录
app.use(express.static('frontend'));

// 解析 application/json 请求体
app.use(bodyParser.json());

app.use('/',logRoutes);

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`服务器正在运行端口${PORT}`);
});