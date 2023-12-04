const express = require('express');
const { getListWorkspace, workspaceInfo, createWorkspace, addMember, updateWorkspace, deleteWorkspace } = require('../controllers/workspaceController');
const { verifyToken } = require('../middleware/tokenMiddleware');
const router = express.Router();

router.get('/', verifyToken, getListWorkspace);
router.get('/detail/:workspace_id', workspaceInfo);
router.post('/create', verifyToken, createWorkspace);
router.post('/add-member/:workspace_id', verifyToken, addMember);
router.put('/update', verifyToken, updateWorkspace);
router.delete('/delete/:workspace_id', verifyToken, deleteWorkspace);


module.exports = router; 
