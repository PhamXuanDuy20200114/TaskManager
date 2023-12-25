const connection = require('../config/database');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getAllUsers, getUserByID, updateByID } = require('../services/userService');
const { hashingPassword, comparePasswords } = require('../services/passwordService');


let getListUsers = async (req, res) => {
    let listUsers = await getAllUsers();

    return res.status(200).json({
        message: 'ok',
        data: listUsers
    })
}

let userInfo = async (req, res) => {
    let id = req.params.user_id;
    if (!id) {
        return res.status(401).json({
            message: "NOT OK"
        })
    }
    let user = await getUserByID(id);
    return res.status(200).json({
        message: "OK",
        data: user
    });
}

let createNewUser = async (req, res) => {
    let { userName, email, password, phone } = req.body;
    if (!userName || !email || !password || !phone) {
        return res.status(400).json({
            message: 'missing required params'
        })
    }

    const [existUser, field1] = await connection.query(`SELECT * FROM users WHERE email = ?`, [email]);

    if (existUser.length != 0) {
        return res.status(400).json({
            message: "User is existed!"
        })
    }

    [result, field2] = await connection.query(`INSERT INTO users (name, email, password, phone)
    VALUES (?,?,?,?)`, [userName, email, password, phone])

    return res.status(200).json({
        message: "Register successful!!!"
    })


}

//Đăng nhâp
let login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'missing required params'
        })
    }

    const [existUser, field1] = await connection.query(`SELECT * FROM users WHERE email = ?`, [email]);

    if (existUser.length == 0) {
        return res.status(400).json({
            message: "User is not exist!!!"
        })
    }
    const user = existUser[0];
    if (password === user.password) {
        const token = jwt.sign({ user_id: user.user_id }, process.env.SECRET_KEY);
        return res.header('Authorization', `Bearer ${token}`).json({ message: "Login successful!!!", data: token });
    }
    return res.status(400).json({
        message: "Password is incorrect!!!",
    })



}

let editUser = async (req, res) => {
    let { user_id, userName, email, phone, password } = req.body;

    if (!user_id || !userName || !email || !password || !phone) {
        return res.status(401).json({
            message: 'missing required params'
        })
    }

    await updateByID(user_id, userName, email, password, phone);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let id = req.params.user_id;
    let [results, fields] = await connection.query(
        `DELETE FROM users
        WHERE user_id = ?;
        `, [id])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getListUsers, userInfo, createNewUser, deleteUser, editUser, login
}
