const express = require('express');
const {
    getTask_ID,
    getTaskList,
    // updateTasks,
    createTask,
    // deleteTasks
} = require('../controllers/taskController');
const router = express.Router();


//route.Method('/route', handler)

router.get('/', getTaskList);
router.get('/detail/:task_id', getTask_ID);
router.post('/create-task', createTask);
// router.put('/update-task', updateTasks);
// router.delete('/delete-task', deleteTasks);


module.exports = router; 
