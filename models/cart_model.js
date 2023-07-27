const mongoose = require('mongoose');

const cartScheme = mongoose.Schema({
    consumerID: { type: String, required: true },
    products: [
        {
            productID: { type: String, required: true },
            quantity: { type: Number, required: false, default: 1 }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('carts', cartScheme);