const connection = require('../config/database');

const getAllTaskByUserID = async (user_id) => {
    let [listTaskID, fields1] = await connection.query('SELECT task_id FROM user_tasks');
    let result = [];
    for (let i = 0; i < listTaskID.length; i++) {
        let [task, fields2] = await connection.query('SELECT * FROM tasks WHERE task_id = ?', [listTaskID[i].task_id]);
        result = result.concat(task);
    }
    return result;
}

const getTaskByID = async (id) => {
    let [results, fields] = await connection.query(`SELECT * FROM tasks WHERE task_id = ? `, [id]);
    if (results[0].workspace_id == null) {
        results[0].workspace_name = "Personal";
    } else {
        let [workspace, fields1] = await connection.query(`SELECT name FROM workspaces WHERE workspace_id = ?`, [workspace_id])
        results[0].workspace_name = workspace[0];
    }
    delete results[0].workspace_id;
    return results;
}
module.exports = {
    getAllTaskByUserID,
    getTaskByID,
};
