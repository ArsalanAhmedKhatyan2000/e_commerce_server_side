const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { loginUser, signupUser, getAllUsers, getUserByID, changePassword, updateUser, deleteUsers, updateFcmToken } = require('../controllers/user_controller');

route.post('/signup', signupUser);
route.post('/login', loginUser);
route.get('/', verifyToken, getAllUsers);
route.get('/:id', verifyToken, getUserByID);
route.put('/changePassword', verifyToken, changePassword);
route.put('/updateUser', verifyToken, updateUser);
route.put('/updateFcmToken', verifyToken, updateFcmToken);
route.delete('/deleteUser', verifyTokenAndAdminAuthorization, deleteUsers);


module.exports = route;