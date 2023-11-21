const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected successfully.")
        }).catch((err) => {
            console.log(err.message)
        })
}

module.exports = db;