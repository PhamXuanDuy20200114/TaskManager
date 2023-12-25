const express = require('express');
const { getListWorkspace, workspaceInfo, createWorkspace, addMember, updateWorkspace, deleteWorkspace, getListUserInWorkspace } = require('../controllers/workspaceController');
const { getTaskByWpId, createTaskInWorkspace } = require('../controllers/workspaceTaskController')
const { verifyToken } = require('../middleware/tokenMiddleware');
const router = express.Router();

router.get('/', verifyToken, getListWorkspace);
router.get('/detail/:workspace_id', workspaceInfo);
router.post('/create', verifyToken, createWorkspace);
router.post('/:workspace_id/add-member', verifyToken, addMember);
router.put('/update', verifyToken, updateWorkspace);
router.delete('/delete/:workspace_id', verifyToken, deleteWorkspace);
router.get('/:workspace_id/list-user', getListUserInWorkspace);

//workspace task
router.get('/:workspace_id/task', getTaskByWpId);
router.post('/:workspace_id/create-task', verifyToken, createTaskInWorkspace);

module.exports = router; 
