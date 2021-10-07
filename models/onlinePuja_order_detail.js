const mongoose = require('mongoose');

// askQuestion schema 

const OnlinePuja_OrderDetailSchema = mongoose.Schema({
    order_id: {
        type: String,
        requried: true,
    },
    onlinePuja_id: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    sku: {
        type: String
    },
    status: {
        type: String
    },
    category_id: {
        type: String
    },
    regular_price_inr: {
        type: String,
    },
    sell_price_inr: {
        type: String,

    },
    regular_price_usd: {
        type: String,
    },
    sell_price_usd: {
        type: String,
    },

    duration_number: {
        type: String,
        required: true
    },
    duration_type: {
        type: String,
    },
    BhojanAddoneId: {
        type: String,
    },
    DakshinaAddoneId: {
        type: String,
    },
    DakshinaAddonePrice: {
        type: String,
    },
    BhojanAddonePrice: {
        type: String,
    },
    username: {
        type: String,
    },
    userdob: {
        type: String,
    },
    userphoneno: {
        type: String,
    },
    usergotr: {
        type: String,
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

// astrologers model

mongoose.model('onlinepuja_order_detail', OnlinePuja_OrderDetailSchema);

module.exports = mongoose.model('onlinepuja_order_detail')
