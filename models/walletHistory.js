const mongoose = require('mongoose');

// askQuestion schema 

const WalletHistorySchema = mongoose.Schema({

  
    user_id: {
        type: String,
        requried : true,
        unique: true
    },
    walletHistoryUser: [
        {
            // amount:{type:String,requried:true},
            callPack:{type:String,requried:true},
            discount:{type:String,requried:true},
             Bonus:{type:String,requried:true},
             amount_credited:{type:String,requried:true},
            amount:{type:String,requried:true},
            amount_refunded:{type:String,requried:true},
            bank:{type:String,requried:true},
            captured:{type:String,requried:true},
            card_id:{type:String,requried:true},
            contact:{type:String,requried:true},
            created_at:{type:String,requried:true},
            currency:{type:String,requried:true},
            description:{type:String,requried:true},
            email:{type:String,requried:true},
            entity:{type:String,requried:true},
            error_code:{type:String,requried:true},
            error_description:{type:String,requried:true},
            error_reason:{type:String,requried:true},
            error_source:{type:String,requried:true},
            error_step:{type:String,requried:true},
            fee:{type:String,requried:true},
            payment_id:{type:String,requried:true},
            international:{type:String,requried:true},
            invoice_id:{type:String,requried:true},
            method:{type:String,requried:true},
           // notes:rechargeDetail.notes,
            order_id:{type:String,requried:true},
            refund_status:{type:String,requried:true},
            status:{type:String,requried:true},
            tax:{type:String,requried:true},
            vpa:{type:String,requried:true},
            wallet:{type:String,requried:true},
        }
    ],
     created_at: {
         type: Date,
         default: new Date()
     }

});

// askQuestion model

mongoose.model('wallethistory_user', WalletHistorySchema);

module.exports = mongoose.model('wallethistory_user')
