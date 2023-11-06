const mongoose = require('mongoose');

const categoryScheme = mongoose.Schema({
    category: { type: String, required: true },
    subCategories: { type: Array, required: true }
}, { timestamps: true })

module.exports = mongoose.model('categories', categoryScheme);