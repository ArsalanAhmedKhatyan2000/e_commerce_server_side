const mongoose = require('mongoose');

const ordersScheme = mongoose.Schema({
    consumerID: { type: String, required: true },
    address: { type: String, required: true },
    paymentMode: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    orderStatus: { type: String, required: false, default: "Pending" },
    totalAmount: { type: Number, required: true },
    deliveryDate: { type: Date, required: false, default: Date.now },
    products: [
        {
            productID: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('orders', ordersScheme);