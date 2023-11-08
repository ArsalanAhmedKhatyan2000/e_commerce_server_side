const express = require('express');
const route = express.Router();
const { verifyToken, verifyTokenAndAdminAuthorization } = require('../middleware/token_verifier');
const { addProduct, getAllProducts, deleteProduct, updateProduct, searchProducts, discountedProducts, getProductsByCategory, searchOptions } = require('../controllers/product_controller');
// verifyTokenAndAdminAuthorization
route.post('/addProduct', addProduct);
route.get('/', getAllProducts);
route.delete('/:productID', verifyTokenAndAdminAuthorization, deleteProduct);
route.put('/updateProduct', verifyTokenAndAdminAuthorization, updateProduct);
route.get('/:searchedText/:page', searchProducts);
route.get('/discountedProducts/page/:page', discountedProducts);
route.get('/productsByCategory/:subCategory/:page', getProductsByCategory);
route.get('/:searchingText', searchOptions);
// route.put("/addBrand", addBrand);

module.exports = route;