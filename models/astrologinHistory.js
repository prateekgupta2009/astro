const mongoose = require('mongoose');

// ProductOrderSchema schema 

const AstrologerLoginHistorySchema = mongoose.Schema({

    astrologer_id:{
        type:String
    },
    time: {
        type: String,
    },
    date: {
        type: String,
    },
    updated_at: {
        type: Date,
        default: new Date()
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

// askQuestion model

mongoose.model('astrologer_login_history', AstrologerLoginHistorySchema);

module.exports = mongoose.model('astrologer_login_history')
