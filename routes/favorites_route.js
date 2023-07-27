const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { addToFavorite, removeItemFromFavorite, getFavorites, clearFavorites } = require('../controllers/favorites_controller');

route.put('/', verifyToken, addToFavorite);
route.get('/getFavorites', verifyToken, getFavorites);
route.delete('/removeItemFromFavorite', verifyToken, removeItemFromFavorite);
route.delete('/clearFavorites', verifyToken, clearFavorites);


module.exports = route;