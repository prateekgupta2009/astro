const mongoose = require('mongoose');

// ProductOrderSchema schema 

const ProductOrderSchema = mongoose.Schema({

    id: {
        type: String,
        requried : true,
        unique: true

    },
    pending: {
        type: String,
    },
    proccessing: {
        type: String,
    },
    success: {
        type: String,
    },
    cancel: {
        type: String,
    },



});

// askQuestion model

mongoose.model('product_order', ProductOrderSchema);

module.exports = mongoose.model('product_order')
