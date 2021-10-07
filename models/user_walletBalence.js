const mongoose = require('mongoose');

// askQuestion schema 

const UserWalletSchema = mongoose.Schema({

  
    user_id: {
        type: String,
        requried : true,
        unique: true
    },
    walletBalence:{type:Number,requried:true},

     created_at: {
         type: Date,
         default: new Date()
     }

});

// askQuestion model

mongoose.model('UserWallet_balence', UserWalletSchema);

module.exports = mongoose.model('UserWallet_balence')
