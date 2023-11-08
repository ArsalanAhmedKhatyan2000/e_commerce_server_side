const express = require('express');
const mongoose = require('mongoose');

const productScheme = mongoose.Schema({
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    productImage: { type: String, required: true },
    description: { type: String, required: true },
    // unit: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: false, default: null },
    isActive: { type: Boolean, required: false, default: true },
}, { timestamps: true })

module.exports = mongoose.model('products', productScheme);