const express = require('express');
const router = express.Router();
const db = require('../config');

// 创建任务
router.post('/tasks', (req, res) => {
    const { id, event, remark, deadline } = req.body;

    // 插入任务的 SQL 语句
    const addTask = 'INSERT INTO task (id, event, remark, deadline) VALUES (?, ?, ?, ?)'; //这里的id为userid

    db.query(addTask, [id, event, remark, deadline], (err, result) => {
        if (err) {
            console.error('数据库插入错误:', err);
            return res.status(500).json({ success: false, message: '插入任务时发生错误' });
        }
        // 插入成功
        return res.status(200).json({ success: true, message: '任务创建成功' });
    });
});

// 获取所有任务计划
router.get('/getPlan', (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ success: false, message: '缺少用户ID' });
    }

    // 查询所有任务的 SQL 语句
    const getPlans = 'SELECT * FROM task WHERE id = ?';

    db.query(getPlans, [id], (err, results) => {
        if (err) {
            console.error('查询错误:', err);
            return res.status(500).json({ success: false, message: '获取任务计划时发生错误' });
        }

        // 返回查询结果
        return res.status(200).json({ success: true, data: results });
    });
});

// 删除任务
router.delete('/deleteTask', (req, res) => {
    const eventid = req.query.taskId; // 从查询参数获取 taskId
    if (!eventid) {
        return res.status(400).json({ message: '缺少任务ID' }); // 如果没有传 taskId，则返回 400 错误
    }

    // 注意这里确保字段名称与数据库匹配
    const deleteTask = 'DELETE FROM task WHERE eventID = ?';
    db.query(deleteTask, [eventid], (err, result) => {
        if (err) {
            console.error('删除错误:', err);
            return res.status(500).json({ message: '删除任务时发生错误' });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: '任务删除成功' });
        } else {
            return res.status(404).json({ message: '任务未找到' });
        }
    });
});

module.exports = router;
