const connection = require('../config/database');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
    getTaskByID,
    getAllTaskByUserID,
    //addTask
} = require('../services/taskService');



let getTaskList = async (req, res) => {
    let user_id = req.decoded.userId;
    let listTask = await getAllTaskByUserID(user_id);
    return res.status(200).json({
        message: 'ok',
        data: listTask
    })
}
let getTask_ID = async (req, res) => {
    let id = req.params.task_id;
    let task = await getTaskByID(id);
    return res.status(200).json({
        message: 'ok',
        data: task
    })
}

const updateTasks = async (req, res) => {
    let { task_id, Name, Description, StartTime, EndTime, status } = req.body;
    if (!task_id || !Name || !StartTime || !EndTime || !status) {
        return res.status(500).json({
            message: "Not OK"
        })
    }
    await connection.query(`UPDATE tasks SET Name = ?, Description= ?, StartTime = ?, EndTime = ?, status = ? WHERE task_id = ?`,
        [Name, Description, StartTime, EndTime, status, task_id]);
    return res.status(200).json({
        message: 'OK'
    })
}

const createTask = async (req, res) => {
    let user_id = req.decoded.userId;
    console.log(req.decoded)
    let { Name, Description, StartTime, EndTime, status } = req.body;
    if (!Name || !StartTime || !EndTime || !status) {
        return res.status(500).json({
            message: "Not OK"
        })
    }
    let [task, fields] = await connection.query(`INSERT INTO tasks (Name, Description, StartTime, EndTime, status) 
        VALUES (?,?,?,?,?)`, [Name, Description, StartTime, EndTime, status]);
    await connection.query(`INSERT INTO user_tasks (user_id, task_id) VALUES (?,?)`, [user_id, task.insertId]);
    return res.status(200).json({
        message: "OK"
    })
}

const deleteTask = async (req, res) => {
    let task_id = req.query.task_id;
    if (!task_id) {
        return res.status(400).json({
            message: "Not Ok"
        })
    }
    await connection.query(`DELETE FROM user_tasks WHERE task_id = ?`, [task_id]);
    await connection.query(`DELETE FROM tasks WHERE task_id = ?`, [task_id])
    return res.status(200).json({
        message: "OK"
    })
}

module.exports = {
    getTask_ID,
    getTaskList,
    updateTasks,
    createTask,
    deleteTask
}
