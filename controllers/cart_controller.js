
const CartModel = require('../models/cart_model');
const ProductModel = require('../models/product_model');

async function getCartProducts(req, res) {
    try {
        const consumerID = req.user.id;
        const userCart = await CartModel.findOne({ consumerID: consumerID });
        var listOfCartProducts = [];
        if (!userCart && userCart.products.length == 0) {
            return res.status(200).json(listOfCartProducts);
        }
        for (var i = 0; i <= userCart.products.length - 1; i++) {
            const product = await ProductModel.findById(userCart.products[i].productID);
            listOfCartProducts.push({
                "product": product,
                "quantity": userCart.products[i].quantity
            });
        }
        return res.status(200).json(listOfCartProducts);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function addToCart(req, res) {
    try {
        const consumerID = req.user.id;
        const { productID, quantity } = req.body;
        if (productID) {
            const userCart = await CartModel.findOne({ consumerID: consumerID });
            // when the document is not exist
            if (!userCart) {
                const cart = CartModel({
                    consumerID: consumerID,
                    products: [{ productID, quantity }]
                });
                const response = await CartModel.create(cart);
                return res.status(200).json(response.products);
            }
            //when the document is already exit
            userCart.products.push({ productID, quantity });
            const response = await CartModel.create(userCart);
            return res.status(200).json(response.products);
        }
        return res.status(400).json({ error: 'productID is required in the request body' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function removeItemFromCart(req, res) {
    try {
        const consumerID = req.user.id;
        const { productID } = req.body;

        // Ensure that the productID is provided
        if (productID) {
            const userCart = await CartModel.findOne({ consumerID: consumerID });
            if (userCart) {
                const index = userCart.products.findIndex(p => p.productID === productID);
                if (index != -1) {
                    // Remove the product from the cart array based based on product index
                    userCart.products.splice(index, 1);
                    // Save the updated cart
                    await userCart.save();
                    return res.status(200).json(userCart.products);
                }
                return res.status(404).json({ error: "Product not found in the cart" });
            }
            return res.status(404).json({ error: 'Cart not found' });
        }
        return res.status(400).json({ error: 'productID is required in the request body' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function clearCart(req, res) {
    try {
        const consumerID = req.user.id;
        const userCart = await CartModel.findOne({ consumerID: consumerID });
        if (!userCart || userCart.products.length == 0) {
            return res.status(400).json({ error: 'Cart is already empty' });
        }
        userCart.products = [];
        await userCart.save();
        return res.status(200).json(userCart.products);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getCartProductsIDs(req, res) {
    try {
        const consumerID = req.user.id;
        const userCart = await CartModel.findOne({ consumerID: consumerID });
        var listOfProductIDs = [];
        if (!userCart || userCart.products.length == 0) {
            return res.status(200).json(listOfProductIDs);
        }
        for (var i = 0; i < userCart.products.length; i++) {
            listOfProductIDs.push(userCart.products[i].productID);
        }
        return res.status(200).json(listOfProductIDs);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function increaseCartItemQuantityByOne(req, res) {
    try {
        const consumerID = req.user.id;
        const productID = req.body.productID;
        const userCart = await CartModel.findOne({ consumerID: consumerID });
        if (!consumerID) {
            return res.status(400).json({ error: 'consumer ID is required' });
        }
        if (!productID) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        if (!userCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        // Find the product in the cart
        const productIndex = userCart.products.findIndex((product) => product.productID === productID);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }
        if (userCart.products[productIndex].quantity == 100) {
            return res.status(400).json({ error: 'Product quantity should not be more than 100' });
        }
        // Increase the quantity by one
        userCart.products[productIndex].quantity += 1;
        // Save the updated cart
        await userCart.save();
        return res.status(200).json(userCart.products);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function decreaseCartItemQuantityByOne(req, res) {
    try {
        const consumerID = req.user.id;
        const productID = req.body.productID;
        const userCart = await CartModel.findOne({ consumerID: consumerID });
        if (!consumerID) {
            return res.status(400).json({ error: 'consumer ID is required' });
        }
        if (!productID) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        if (!userCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        // Find the product in the cart
        const productIndex = userCart.products.findIndex((product) => product.productID === productID);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }
        if (userCart.products[productIndex].quantity == 1) {
            return res.status(400).json({ error: 'Product quantity should be atleast 1' });
        }
        // Decrease the quantity by one
        userCart.products[productIndex].quantity -= 1;
        // Save the updated cart
        await userCart.save();
        return res.status(200).json(userCart.products);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addToCart, removeItemFromCart, getCartProducts, clearCart, getCartProductsIDs, increaseCartItemQuantityByOne, decreaseCartItemQuantityByOne };
