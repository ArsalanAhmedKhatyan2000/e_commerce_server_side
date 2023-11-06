const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { addCategory, getCategory } = require('../controllers/category_controller');

// verifyTokenAndAdminAuthorization
route.get('/', getCategory);
route.post('/addCategory', addCategory);



module.exports = route;