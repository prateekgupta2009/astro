const mongoose = require('mongoose');

// askQuestion schema 

const Astrologer_bankDetailSchema = mongoose.Schema({

    astrologer_id: {
        type: String,
        required: true
    },
    bank_name: {
        type: String,
        required: true,        
    },
    branch: {
        type: String,
        required: true
    },
    account_no: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true,        
    },
    bank_address: {
        type: String,
        required: true
    },
    bank_country_id: {
        type: String,
        required: true,        
    },
    bank_state_id: {
        type: String,
        required: true
    },
    bank_city_id: {
        type: String,
        required: true,        
    },


    
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

mongoose.model('astrologer_bank_details', Astrologer_bankDetailSchema);

module.exports = mongoose.model('astrologer_bank_details')
