const connection = require('../config/database')

const getAllWorkspaceByUserId = async (user_id) => {
    let [list_Id, field] = await connection.query(`SELECT workspace_id FROM workspace_user WHERE user_id = ?`, [user_id]);
    let result = [];
    for (let i = 0; i < list_Id.length; i++) {
        let [workspace, field] = await connection.query(`SELECT * FROM workspaces WHERE workspace_id = ?`, [list_Id[i].workspace_id]);
        result.push(workspace[0]);
    }
    return result;
}

const getWorkspaceById = async (workspace_id) => {
    let [result, field] = await connection.query(`SELECT * FROM workspaces WHERE workspace_id = ?`, [workspace_id]);
    return result;
}

const addWorkspaceByUserId = async (user_id, name, description) => {
    let [result, field] = await connection.query(`INSERT INTO workspaces (name, description) VALUES (?,?)`, [name, description]);
    await connection.query(`INSERT INTO workspace_user (workspace_id, user_id, role_id) VALUES (?,?,1)`, [result.insertId, user_id]);
}

const addMemberByEmail = async (email, workspace_id) => {
    let [user_id, field2] = await connection.query(`SELECT user_id FROM users WHERE email = ?`, [email]);
    console.log(user_id)
    for (let i = 0; i < user_id.length; i++) {
        await connection.query(`INSERT INTO workspace_user (workspace_id, user_id, role_id) VALUES (?,?,2)`, [workspace_id, user_id[i].user_id]);
    }
}


module.exports = {
    getAllWorkspaceByUserId,
    getWorkspaceById,
    addWorkspaceByUserId,
    addMemberByEmail
}