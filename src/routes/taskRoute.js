const express = require('express');
const {
    getTask_ID,
    getTaskList,
    updateTasks,
    createTask,
    deleteTask
} = require('../controllers/taskController');
const { verifyToken } = require('../middleware/tokenMiddleware')
const router = express.Router();

//route.Method('/route', handler)

router.get('/', verifyToken, getTaskList);
router.get('/detail/:task_id', getTask_ID);
router.post('/create', verifyToken, createTask);
router.put('/update', updateTasks);
router.delete('/delete/:task_id', deleteTask);


module.exports = router; 
