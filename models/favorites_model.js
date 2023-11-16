const mongoose = require('mongoose');

const favoriteScheme = mongoose.Schema({
    consumerID: { type: String, required: true },
    favoriteProducts: []
    // favoriteProducts: [
    //     {
    //         productID: { type: String, required: true }
    //     }
    // ]
}, { timestamps: true })

module.exports = mongoose.model('favorites', favoriteScheme);