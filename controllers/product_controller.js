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
            regularPrice: req.body.regularPrice,
            discountedPrice: req.body.discountedPrice,
            isActive: req.body.isActive
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
        console.log("deletedProduct : " + deletedProduct);
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
                regularPrice: req.body.regularPrice ?? existingProductData.regularPrice,
                discountedPrice: req.body.discountedPrice ?? existingProductData.discountedPrice,
                isActive: req.body.isActive ?? existingProductData.isActive,
            };
            const response = await ProductModel.findByIdAndUpdate(req.body.id, productUpdatedModel, { new: true });
            return res.status(200).json({ message: "Product updated successfully" });
        }
        return res.status(404).json({ error: "Product does not exist" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { addProduct, getAllProducts, deleteProduct, updateProduct };