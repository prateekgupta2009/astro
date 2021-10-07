const mongoose = require('mongoose');

// askQuestion schema 

const WalletPaymentGetwaySchema = mongoose.Schema({
   wallet_detail_id: {
        type: String,
        requried: true,
    },
    
    paymentid: { type: String, requried: true },
    // notes:rechargeDetail.notes,
    order_id: { type: String, requried: true },
    refund_status: { type: String, requried: true },
    status: { type: String, requried: true },
    // wallet: { type: String, requried: true },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    },

});

// askQuestion model

mongoose.model('wallet_payment_getway', WalletPaymentGetwaySchema);

module.exports = mongoose.model('wallet_payment_getway')
