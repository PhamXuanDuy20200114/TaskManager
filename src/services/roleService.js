const connection = require('../config/database');

const checkWorkspaceHost = async (user_id) => {
    let [user_role, field] = await connection.query(`SELECT role_id FROM workspace_user WHERE user_id = ?`, [user_id]);
    if (user_role[0].role_id === 1) {
        return true;
    }
    return false;
}

module.exports = {
    checkWorkspaceHost
}