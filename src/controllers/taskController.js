const connection = require('../config/database');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
    getTaskByID,
    getAllTaskByUserID,
    // updateTasks,
    addTask,
    // deleteTasks 
} = require('../services/taskService');



let getTaskList = async (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    console.log(token);
    let user_id;
    await jwt.verify(token, process.env.SECRET_KEY, (resolve, reject) => {
        if (reject) {
            return res.status(400).json({
                message: "Token khong hop le"
            })
        }
        user_id = resolve;
        console.log(resolve)
    })
    console.log(user_id)
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

// const updateTasks = (req, res) => {
//     res.render('sample.ejs')
// }
const createTask = async (req, res) => {
    let { Name, Description, StartTime, EndTime, status } = req.body;
    if (!Name || !StartTime || !EndTime || !status) {
        return res.status(500).json({
            message: "Not OK"
        })
    }
    await connection.query(`INSERT INTO tasks (Name, Description, StartTime, EndTime, status) 
        VALUES (?,?,?,?,?)`, [Name, Description, StartTime, EndTime, status]);
    return res.status(200).json({
        message: "OK"
    })
}

// const deleteTasks = (req, res) => {
//     res.render('sample.ejs')
// }

module.exports = {
    getTask_ID,
    getTaskList,
    // updateTasks,
    createTask,
    // deleteTasks,
}
