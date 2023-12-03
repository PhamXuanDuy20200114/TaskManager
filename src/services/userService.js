const connection = require("../config/database");

const getAllUsers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM users u');
    return results;
}

const getUserByID = async (userID) => {
    let [results, fields] = await connection.query(`SELECT * FROM users Where user_id =  ?`, [userID]);
    return results;
}

const updateByID = async (userID, name, email, password, phone) => {
    let [results, fields] = await connection.query(
        `UPDATE users
        SET email = ?, name = ?, phone = ?, password = ?
        WHERE user_id = ?;
        `, [email, name, phone, password, userID])
}

const deleteUserByID = async (id) => {
    let [results, fields] = await connection.query(
        `DELETE FROM users
        WHERE user_id = ?;
        `, [id])
}


module.exports = {
    getAllUsers,
    updateByID,
    getUserByID,
    deleteUserByID
};