const express = require('express');
const router = express.Router();
const db = require('../config');

// 创建任务
router.post('/tasks', (req, res) => {
    const { id, event, remark, deadline } = req.body;

    // 插入任务的 SQL 语句
    const addTask = 'INSERT INTO Task (id, event, remark, deadline) VALUES (?, ?, ?, ?)';//这里的id为userid

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
    // 查询所有任务的 SQL 语句
    const getPlans = 'SELECT * FROM Task where id=?';
    const id = req.query.id;
    db.query(getPlans,[id], (err, results) => {
        if (err) {
            console.error('查询错误:', err);
            return res.status(500).json({ success: false, message: '获取任务计划时发生错误' });
        }

        // 返回查询结果
        return res.status(200).json({ success: true, data: results });
    });
});

// 后端路由
router.delete('/deleteTask', (req, res) => {
    const eventid = req.query.taskId; // 从查询参数获取 taskId
    if (!eventid) {
        return res.status(400).json({ message: 'Missing taskId' }); // 如果没有传 taskId，则返回 400 错误
    }

    const deleteTask = 'DELETE FROM task WHERE eventID = ?';
    db.query(deleteTask, [eventid], (err, result) => {
        if (err) {
            console.error('Delete error:', err);
            return res.status(500).json({ message: 'Error deleting task' });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'success' });
        } else {
            return res.status(404).json({ message: 'Task not found' });
        }
    });
});

module.exports = router;
