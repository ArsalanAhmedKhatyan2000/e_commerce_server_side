const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { addToFavorite, removeItemFromFavorite, getFavoriteProducts, clearFavorites, getFavoriteProductsIDs } = require('../controllers/favorites_controller');

route.put('/', verifyToken, addToFavorite);
route.get('/getFavorites', verifyToken, getFavoriteProducts);
route.get('/getFavoriteProductsIDs', verifyToken, getFavoriteProductsIDs);
route.delete('/removeItemFromFavorite', verifyToken, removeItemFromFavorite);
route.delete('/clearFavorites', verifyToken, clearFavorites);


module.exports = route;