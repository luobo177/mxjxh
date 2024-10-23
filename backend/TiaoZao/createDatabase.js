const db = require('./config')
db.query('Create DATABASE IF NOT EXISTS tiaozao',(err,result)=>{
    if (err){
        console.log('数据库创建失败',err);
        return;
    }
    console.log('数据库创建成功或者已存在');
})

db.changeUser({database:'tiaozao'},err=>{
    if(err){
        console.log('切换数据库失败');
        return;
    }
    console.log('切换数据库成功');
})

const createProductsTable = `
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    price DECIMAL(10, 2) NOT NULL,
                    description TEXT,
                    seller_contact VARCHAR(255) NOT NULL,
                    seller_id INT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

db.query(createProductsTable,(err,result)=>{
    if(err){
        console.log('创建商品表失败');
        return;
    }
    console.log('创建商品表成功');
    db.end();
})