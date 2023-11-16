
const FavoriteModel = require('../models/favorites_model');
const mongoose = require('mongoose');
const ProductModel = require('../models/product_model');

async function getFavoriteProducts(req, res) {
    try {
        const consumerID = req.user.id;
        const userFavorite = await FavoriteModel.findOne({ consumerID: consumerID });
        var listOfProductIDs = [];
        if (!userFavorite || userFavorite.favoriteProducts.length == 0) {
            return res.status(200).json(listOfProductIDs);
        }
        listOfProductIDs = userFavorite.favoriteProducts;
        // for (var i = 0; i <= userFavorite.favoriteProducts.length - 1; i++) {
        //     var productID = userFavorite.favoriteProducts[i]['productID'];
        //     listOfProductIDs.push(new mongoose.Types.ObjectId(productID)); //
        // }
        const listOfProducts = await ProductModel.find({ '_id': listOfProductIDs });
        return res.status(200).json(listOfProducts);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function addToFavorite(req, res) {
    try {
        const consumerID = req.user.id;
        const { productID } = req.body;
        if (productID) {
            const userFavorite = await FavoriteModel.findOne({ consumerID: consumerID });
            // when the document is not exist
            if (!userFavorite) {
                const favorite = FavoriteModel({
                    consumerID: consumerID,
                    favoriteProducts: [productID]
                    // favoriteProducts: [{ productID }]
                });
                const response = await FavoriteModel.create(favorite);
                return res.status(200).json(response.favoriteProducts);
            }
            //when the document is already exit
            userFavorite.favoriteProducts.push(productID);
            // userFavorite.favoriteProducts.push({ productID });
            const response = await FavoriteModel.create(userFavorite);
            return res.status(200).json(response.favoriteProducts);
        }
        return res.status(400).json({ error: 'productID is required in the request body' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function removeItemFromFavorite(req, res) {
    try {
        const consumerID = req.user.id;
        const { productID } = req.body;

        // Ensure that the productID is provided
        if (productID) {
            const userFavorite = await FavoriteModel.findOne({ consumerID: consumerID });
            if (userFavorite) {
                const index = await userFavorite.favoriteProducts.findIndex(p => p === productID);
                if (index != -1) {
                    // Remove the product from the favorite array based based on product index
                    userFavorite.favoriteProducts.splice(index, 1);
                    // Save the updated cart
                    await userFavorite.save();
                    return res.status(200).json(userFavorite.favoriteProducts);
                }
                return res.status(404).json({ error: "Product not found in the favorites" });
            }
            return res.status(404).json({ error: 'Favorite Products are not found' });
        }
        return res.status(400).json({ error: 'productID is required in the request body' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getFavoriteProductsIDs(req, res) {
    try {
        const consumerID = req.user.id;
        const userFavorite = await FavoriteModel.findOne({ consumerID: consumerID });
        var listOfProductIDs = [];
        if (!userFavorite || userFavorite.favoriteProducts.length == 0) {
            return res.status(200).json(listOfProductIDs);
        }
        listOfProductIDs = userFavorite.favoriteProducts;
        return res.status(200).json(listOfProductIDs);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function clearFavorites(req, res) {
    try {
        const consumerID = req.user.id;
        const userFavorite = await FavoriteModel.findOne({ consumerID: consumerID });
        if (userFavorite) {
            if (userFavorite.favoriteProducts.length != 0) {
                userFavorite.favoriteProducts = [];
                await userFavorite.save();
                return res.status(200).json(userFavorite.favoriteProducts);
            }
            return res.status(400).json({ error: 'Favorite is already empty' });
        }
        return res.status(404).json({ error: 'Favorite Products are not found' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addToFavorite, removeItemFromFavorite, getFavoriteProducts, clearFavorites, getFavoriteProductsIDs };
