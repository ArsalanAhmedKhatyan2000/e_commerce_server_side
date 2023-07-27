const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { addProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/product_controller');

route.post('/addProduct', verifyTokenAndAdminAuthorization, addProduct);
route.get('/', verifyToken, getAllProducts);
route.delete('/:productID', verifyTokenAndAdminAuthorization, deleteProduct);
route.put('/updateProduct', verifyTokenAndAdminAuthorization, updateProduct);


module.exports = route;