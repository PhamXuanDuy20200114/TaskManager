const connection = require('../config/database');
const { verifyToken } = require('../middleware/tokenMiddleware');
const { checkWorkspaceHost } = require('../services/roleService')
require('dotenv').config();


const getTaskByWpId = async (req, res) => {
    let wpId = req.params.workspace_id;
    if (!wpId) {
        return res.status(400).json({
            message: "Not OK"
        })
    }
    let [listTask, field] = await connection.query(`SELECT * FROM tasks WHERE workspace_id = ? `, [wpId]);
    return res.status(200).json({
        message: "OK",
        data: listTask
    })
}

const createTaskInWorkspace = async (req, res) => {
    let userId = req.decoded.user_id;
    if (!userId) {
        return res.status(400).json({
            message: 'Not OK1'
        })
    }
    let check = await checkWorkspaceHost(userId);
    if (!check) {
        return res.status(400).json({
            message: "You are not host"
        })
    }
    let workspace_id = req.params.workspace_id;
    let { Name, Description, StartTime, EndTime, listId } = req.body;
    if (!Name || !StartTime || !EndTime || !listId || !workspace_id) {
        return res.status(400).json({
            message: "Not OK2"
        })
    }

    let [task, field2] = await connection.query(`INSERT INTO tasks (Name, Description, StartTime, EndTime, workspace_id, status) 
        VALUES (?,?,?,?,?,1)`, [Name, Description, StartTime, EndTime, workspace_id]);
    for (let i = 0; i < listId.length; i++) {
        await connection.query(`INSERT INTO user_tasks (user_id, task_id) VALUES (?,?)`, [listId[i], task.insertId]);
    }
    return res.status(200).json({
        message: 'OK',
    })
}
module.exports = {
    getTaskByWpId,
    createTaskInWorkspace
}