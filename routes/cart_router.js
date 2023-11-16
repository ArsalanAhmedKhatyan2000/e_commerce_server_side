const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { addToCart, removeItemFromCart, getCart, clearCart, getCartProductsIDs } = require('../controllers/cart_controller');

route.put('/', verifyToken, addToCart);
route.get('/getCart', verifyToken, getCart);
route.get('/getCartProductsIDs', verifyToken, getCartProductsIDs);
route.delete('/removeItemFromCart', verifyToken, removeItemFromCart);
route.delete('/clearCart', verifyToken, clearCart);


module.exports = route;