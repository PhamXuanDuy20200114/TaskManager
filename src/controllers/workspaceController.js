const connection = require('../config/database');
const jwt = require('jsonwebtoken');
const { getAllWorkspaceByUserId, getWorkspaceById, addWorkspaceByUserId, addMemberByEmail } = require('../services/workspaceService');
const { checkWorkspaceHost } = require('../services/roleService')
require('dotenv').config();

const getListWorkspace = async (req, res) => {
    let user_id = req.decoded.user_id;
    let listWorkspace = await getAllWorkspaceByUserId(user_id);
    return res.status(200).json({
        message: "OK",
        data: listWorkspace
    })
}

const workspaceInfo = async (req, res) => {
    let id = req.params.workspace_id;
    if (!id) {
        return res.status(400).json({
            message: 'Not OK'
        })
    }
    let workspaceDetail = await getWorkspaceById(id);
    return res.status(200).json({
        message: 'ok',
        data: workspaceDetail[0]
    })
}

const createWorkspace = async (req, res) => {
    let id = req.decoded.user_id;
    let { name, description } = req.body;
    if (!id || !name || !description) {
        return res.status(400).json({
            message: "Not OK"
        })
    }
    await addWorkspaceByUserId(id, name, description);
    return res.status(200).json({
        message: "OK"
    })
}

const addMember = async (req, res) => {
    let userId = req.decoded.user_id;
    if (!userId) {
        return res.status(400).json({
            message: 'Not OK'
        })
    }
    if (!checkWorkspaceHost(userId)) {
        return res.status(400).json({
            message: "You are not host"
        })
    }
    let emailMember = req.body.email;
    let workspaceId = req.params.workspace_id;
    if (!emailMember || !workspaceId) {
        return res.status(400).json({
            message: "Not OK"
        })
    }
    if (emailMember.includes(', ')) {
        listEmail = emailMember.split(', ');
        for (let i = 0; i < listEmail.length; i++) {
            await addMemberByEmail(listEmail[i], workspaceId);
        }
    } else {
        await addMemberByEmail(emailMember, workspaceId);
    }

    return res.status(200).json({
        message: "OK"
    })
}

const updateWorkspace = async (req, res) => {
    let userId = req.decoded.user_id;
    if (!userId) {
        return res.status(400).json({
            message: 'Not OK'
        })
    }
    let check = await checkWorkspaceHost(userId)
    if (!check) {
        return res.status(400).json({
            message: "You are not host"
        })
    }
    let { workspaceId, name, description } = req.body;
    if (!workspaceId || !name || !description) {
        return res.status(400).json({
            message: "Not Ok"
        })
    }
    await connection.query(`UPDATE workspaces SET name = ?, description = ? WHERE workspace_id = ?`, [name, description, workspaceId]);
    return res.status(200).json({
        message: "OK"
    })
}

const deleteWorkspace = async (req, res) => {
    let userId = req.decoded.user_id;
    if (!userId) {
        return res.status(400).json({
            message: 'Not OK'
        })
    }
    let check = await checkWorkspaceHost(userId);
    if (!check) {
        return res.status(400).json({
            message: "You are not host"
        })
    }
    let workspaceId = req.params.workspace_id;
    if (!workspaceId) {
        return res.status(400).json({
            message: "Not Ok"
        })
    }
    await connection.query(`DELETE FROM workspace_user WHERE workspace_id = ?`, [workspaceId]);
    await connection.query(`DELETE FROM workspaces WHERE workspace_id = ?`, [workspaceId]);
    return res.status(200).json({
        message: "OK"
    })
}

const getListUserInWorkspace = async (req, res) => {
    let workspace_id = req.params.workspace_id;
    if (!workspace_id) {
        return res.status(400).json({
            message: 'Not Ok'
        })
    }
    let [userId, field1] = await connection.query(`SELECT user_id FROM workspace_user WHERE workspace_id = ?`, [workspace_id]);
    let listUser = [];
    for (let i = 0; i < userId.length; i++) {
        let [user, field2] = await connection.query(`SELECT * FROM users WHERE user_id = ?`, [userId[i].user_id]);
        listUser.push(user[0]);
    }
    return res.status(200).json({
        message: "OK",
        data: listUser
    })
}

module.exports = {
    getListWorkspace,
    workspaceInfo,
    createWorkspace,
    addMember,
    updateWorkspace,
    deleteWorkspace,
    getListUserInWorkspace
}