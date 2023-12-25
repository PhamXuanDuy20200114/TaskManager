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
        let [workspace, fields1] = await connection.query(`SELECT name FROM workspaces WHERE workspace_id = ?`, [results[0].workspace_id])
        results[0].workspace_name = workspace[0].name;
    }
    let [memberId, field2] = await connection.query(`SELECT user_id FROM user_tasks WHERE task_id = ?`, [id]);
    let listMember = [];
    for (let i = 0; i < memberId.length; i++) {
        let [member, field3] = await connection.query(`SELECT * FROM users WHERE user_id = ?`, [memberId[i].user_id]);
        listMember.push(member);
    }
    results[0].member = listMember;
    return results;
}


module.exports = {
    getAllTaskByUserID,
    getTaskByID,
};
