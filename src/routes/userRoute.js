const express = require('express');
const { getListUsers, userInfo, createNewUser, editUser, deleteUser, login } = require('../controllers/userController');
const router = express.Router();


//route.Method('/route', handler)

router.get('/list', getListUsers); //method GET -> Read data
router.get('/detail/:user_id', userInfo); //method GET -> Read data
router.post('/register', createNewUser);//method POST -> Create data
router.post('/login', login);//method POST -> Create data
router.put('/update-user', editUser);// method PUT -> Update data
router.delete('/delete-user/:user_id', deleteUser);//Method DELETE -> Delete data


module.exports = router; 
