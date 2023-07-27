const mongoose = require('mongoose');

const db = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/e_commerce', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected successfully.")
        }).catch((err) => {
            console.log(err.message)
        })
}

module.exports = db;