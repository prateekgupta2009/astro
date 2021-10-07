const mongoose = require('mongoose');

// askQuestion schema 

const Estore_addonsSchema = mongoose.Schema({

    product_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,        
    },
    type_id: {
        type: String,
        required: true,
    },
    option: {
        type: String,
        required: true
    },
    option_id:{
        type: String,
        required: true
    },
    price_inr:{
        type:String,
        required: true
    },
    price_usd:{
        type:String,
        required: true
    }
   
    
    // created_at: {
    //     type: Date,
    //     default: new Date()
    // }
    // createAt: {
    //     type: Date,
    //     default: Date.now(),
    //     index: { expires: 60*1 }
    // }
//     expire_at: {type: Date,
//         default: Date.now, 
//         expires: 30
//    } 
});

// astrologers model

mongoose.model('estore_addons', Estore_addonsSchema);

module.exports = mongoose.model('estore_addons')
