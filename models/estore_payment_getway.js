const mongoose = require('mongoose');

// askQuestion schema 

const Estore_payment_getwaySchema = mongoose.Schema({

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
        // index: { expires: 60*1 }
    }
});

// astrologers model

mongoose.model('estore_payment_getway', Estore_payment_getwaySchema);

module.exports = mongoose.model('estore_payment_getway')
