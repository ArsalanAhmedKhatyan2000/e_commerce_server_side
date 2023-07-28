const OrdersModel = require('../models/orders_model');


async function createOrder(req, res) {
    try {
        const consumerID = req.user.id;
        const { address, paymentMode, products } = req.body;
        if (!address || !paymentMode || !products || products.length == 0) {
            return res.status(400).json({ error: 'address, paymentMode, products are required in the request body' });
        }
        const paymentStatus = paymentMode == "COD" ? "Unpaid" : "Paid";
        // Calculate the total amount for the order based on the products' prices and quantities
        const totalAmount = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        const order = OrdersModel({ consumerID, address, paymentMode, paymentStatus, totalAmount, products });
        const response = await OrdersModel.create(order);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllOrders(req, res) {
    try {
        const orders = await OrdersModel.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getOrdersByConsumerID(req, res) {
    try {
        const consumerID = req.user.id;
        const orders = await OrdersModel.find({ consumerID });
        if (orders) {
            return res.status(200).json(orders);
        }
        return res.status(404).json({ error: 'Sorry! Orders not found' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = { createOrder, getAllOrders, getOrdersByConsumerID };