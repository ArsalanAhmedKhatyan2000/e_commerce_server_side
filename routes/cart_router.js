const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { addToCart, removeItemFromCart, getCartProducts, clearCart, getCartProductsIDs, increaseCartItemQuantityByOne, decreaseCartItemQuantityByOne } = require('../controllers/cart_controller');

route.put('/', verifyToken, addToCart);
route.get('/getCart', verifyToken, getCartProducts);
route.get('/getCartProductsIDs', verifyToken, getCartProductsIDs);
route.delete('/removeItemFromCart', verifyToken, removeItemFromCart);
route.delete('/clearCart', verifyToken, clearCart);
route.put('/increaseCartItemQuantity', verifyToken, increaseCartItemQuantityByOne);
route.put('/decreaseCartItemQuantityByOne', verifyToken, decreaseCartItemQuantityByOne);


module.exports = route;