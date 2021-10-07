const mongoose = require('mongoose');

// askQuestion schema 

const OnlinePuja_payment_getwaySchema = mongoose.Schema({

    order_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    payment_id:{
        type: String,
        
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }
});

// astrologers model

mongoose.model('onlinepuja_payment_getway', OnlinePuja_payment_getwaySchema);

module.exports = mongoose.model('onlinepuja_payment_getway')
