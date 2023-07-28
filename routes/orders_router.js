const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { createOrder, getAllOrders, getOrdersByConsumerID } = require('../controllers/orders_controller');

route.post('/createOrder', verifyToken, createOrder);
route.get('/getAllOrders', verifyTokenAndAdminAuthorization, getAllOrders);
route.get('/getOrdersByConsumerID', verifyToken, getOrdersByConsumerID)

module.exports = route;