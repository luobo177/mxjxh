
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config.js');
const router=express.Router();


router.get('/test', (req, res) => {
    res.send('Test route is working!');
});

router.post('/log',(req,res)=>{
    const { username,password}=req.body;
    if(! username || !password){
        return res.status(400).json({message:'用户密码不能为空'});
    }

    const query='select * from user where name=? and password=?'
    db.query(query,[username,password],(err,results)=>{
        if(err){
            console.error('数据库查询错误',err)
            return res.status(500).json({message:'服务器错误'});
        }
        if(results.length>0){
            res.json({
                message:'登录成功',
                user: {
                    id: results[0].id, // 从结果中提取 id
                    name: results[0].name, // 从结果中提取 name
                    contact: results[0].contact // 从结果中提取 contact
                }
            });
        }else{
            res.status(401).json({message:'用户名或密码有问题'});
        }
    });
});

module.exports = router;
