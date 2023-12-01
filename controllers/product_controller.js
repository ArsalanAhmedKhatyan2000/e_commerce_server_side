const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('../models/product_model');

async function addProduct(req, res) {
    try {
        const product = ProductModel({
            productName: req.body.productName,
            productImage: req.body.productImage,
            description: req.body.description,
            category: req.body.category,
            // unit: req.body.unit,
            subCategory: req.body.subCategory,
            regularPrice: req.body.regularPrice,
            discountedPrice: req.body.discountedPrice,
            brand: req.body.brand,
            isActive: req.body.isActive,
            isFeatured: req.body.isFeatured,
        });
        const createdProdct = await ProductModel.create(product);
        return res.status(201).json(createdProdct);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllProducts(req, res) {
    try {
        const listOfProducts = await ProductModel.find();
        return res.status(200).json(listOfProducts);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteProduct(req, res) {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.productID, { new: true });
        if (deletedProduct) {
            return res.status(200).json({ message: "Product deleted successfully" });
        }
        return res.status(404).json({ error: "Product does not exist" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function updateProduct(req, res) {
    try {
        const existingProductData = await ProductModel.findById(req.body.id);
        if (existingProductData) {
            const productUpdatedModel = {
                productName: req.body.productName ?? existingProductData.productName,
                productImage: req.body.productImage ?? existingProductData.productImage,
                description: req.body.description ?? existingProductData.description,
                category: req.body.category ?? existingProductData.category,
                subCategory: req.body.subCategory ?? existingProductData.subCategory,
                regularPrice: req.body.regularPrice ?? existingProductData.regularPrice,
                discountedPrice: req.body.discountedPrice ?? existingProductData.discountedPrice,
                // unit: req.body.unit ?? existingProductData.unit,
                brand: req.body.brand ?? existingProductData.brand,
                isActive: req.body.isActive ?? existingProductData.isActive,
                isFeatured: req.body.isFeatured ?? existingProductData.isFeatured,
            };
            const response = await ProductModel.findByIdAndUpdate(req.body.id, productUpdatedModel, { new: true });
            return res.status(200).json({ message: "Product updated successfully" });
        }
        return res.status(404).json({ error: "Product does not exist" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
// async function addBrand(req, res) {
//     const listOfProducts = await ProductModel.find();
//     for (var i = 0; i <= listOfProducts.length - 1; i++) {
//         const productUpdatedModel = {
//             productName: listOfProducts[i]["productName"],
//             productImage: listOfProducts[i]["productImage"],
//             description: listOfProducts[i]["description"],
//             category: listOfProducts[i]["category"],
//             subCategory: listOfProducts[i]["subCategory"],
//             regularPrice: listOfProducts[i]["regularPrice"],
//             discountedPrice: listOfProducts[i]["discountedPrice"],
//             brand: listOfProducts[i]["brand"],
//             isActive: listOfProducts[i]["isActive"],
//             isFeatured: false,
//         };
//         const response = await ProductModel.findByIdAndUpdate(listOfProducts[i]["_id"].toString(), productUpdatedModel, { new: true });
//     }

// }
async function searchOptions(req, res) {
    try {
        const searchingText = req.params.searchingText;
        const listOfProducts = await ProductModel.find({
            productName: { $regex: searchingText, $options: 'i' }, // 'i' makes it case-insensitive
        });
        var listOfOptions = [];
        listOfProducts.map((value) => {
            listOfOptions.push(value["productName"]);
        });
        return res.status(200).json(listOfOptions);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function searchProducts(req, res) {
    try {
        let page = req.params.page ?? 1;
        const searchedText = req.params.searchedText;
        let limit = 10;
        if (searchedText == null) {
            return res.status(400).json({ error: "Search text is required" });
        }
        const listOfProducts = await ProductModel.find({
            productName: { $regex: searchedText, $options: 'i' }, // 'i' makes it case-insensitive
        }).skip((page * limit) - limit).limit(limit);
        return res.status(200).json(listOfProducts);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function discountedProducts(req, res) {
    try {
        let page = req.params.page ?? 1;
        let limit = 10;
        // { $ne: null }
        const listOfProducts = await ProductModel.find({ discountedPrice: { $eq: null } }).skip((page * limit) - limit).limit(limit);
        return res.status(200).json(listOfProducts);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getProductsByCategory(req, res) {
    try {
        let page = req.params.page ?? 1;
        let subCategory = req.params.subCategory;
        let limit = 10;
        // { $ne: null }
        const listOfProducts = await ProductModel.find({ subCategory: { $eq: subCategory } }).skip((page * limit) - limit).limit(limit);
        return res.status(200).json(listOfProducts);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getFetauredProducts(req, res) {
    try {
        const listOfProducts = await ProductModel.find({ isFeatured: { $eq: true } });
        return res.status(200).json(listOfProducts);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getProductsByBrand(req, res) {
    try {
        const brand = req.params.brand;
        if(brand==null){
            return res.status(400).json({ error: "Brand is required" });
        }        
        let page = req.params.page ?? 1;
        let limit = 10;
        const listOfProducts = await ProductModel.find({ brand: { $eq: brand } }).skip((page * limit) - limit).limit(limit);;
        return res.status(200).json(listOfProducts);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addProduct, getAllProducts, deleteProduct, updateProduct, searchProducts, discountedProducts, getProductsByCategory, searchOptions, getFetauredProducts,getProductsByBrand };