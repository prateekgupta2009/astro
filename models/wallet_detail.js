const mongoose = require('mongoose');

// askQuestion schema 

const WalletDetailSchema = mongoose.Schema({
    user_id: {
        type: String,
        requried: true,
    },
    callPack: {
        type: String,
        requried: true,
    },
    discount: { type: String, requried: true },
    Bonus: { type: String, requried: true },
    amount_credited: { type: String, requried: true },
    amount_refunded: { type: String, requried: true },
    // notes:rechargeDetail.notes,
    order_id: { type: String, requried: true },
    refund_status: { type: String, requried: true },
    status: { type: String, requried: true },
     vpa: { type: String, requried: true },
     method:{
        type: String, requried: true 
     },
     currency: { type: String, requried: true },
     description: { type: String, requried: true },
     email: { type: String, requried: true },
     entity: { type: String, requried: true },
     international:{ type: String, requried: true },



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

mongoose.model('wallet_detail', WalletDetailSchema);

module.exports = mongoose.model('wallet_detail')
