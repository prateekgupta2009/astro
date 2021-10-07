const mongoose = require('mongoose');

// askQuestion schema 

const Estore_payment_DetailSchema = mongoose.Schema({

    order_id: {
        type: String,
        required: true
    },

    amount: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true
    }, 
    transection_id: {
        type: Date,
    },
    payment_status: {
        type: Date,
        default: new Date()
    },
    date: {
        type: Date,
        default: new Date()
    },
    createAt: {
        type: Date,
        default: Date.now(),
        index: { expires: 60*1 }
    }
//     expire_at: {type: Date,
//         default: Date.now, 
//         expires: 30
//    } 
});

// astrologers model

mongoose.model('estore_payment_detail', Estore_payment_DetailSchema);

module.exports = mongoose.model('estore_payment_detail')
