const connection = require('../config/database');

const getAllTaskByUserID = async (user_id) => {
    let [listTaskID, fields1] = await connection.query('SELECT task_id FROM user_tasks');
    let result = [];
    await listTaskID.forEach(async (taskID) => {
        let [task, fields2] = await connection.query('SELECT * FROM tasks WHERE task_id = ?', [taskID]);
        result = result.concat(task);
    });
    return result;
}
const getTaskByID = async (id) => {
    let [results, fields] = await connection.query(`SELECT * FROM tasks WHERE task_id = ? `, [id]);
    return results;
}
const addTask = async (name, description, startTime, endTime, status) => {
    let [results, fields] = await connection.query(`INSERT INTO tasks (Name, Description, StartTime, EndTime, status) 
        VALUES (?,?,?,?,?)`, [name, description, startTime, endTime, status]);
}


module.exports = {
    getAllTaskByUserID,
    getTaskByID,
    addTask,
};
