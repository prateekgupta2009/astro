const mongoose = require('mongoose');

// ProductOrderSchema schema 

const AstrologerStatusSchema = mongoose.Schema({

    astrologer_id:{
        type:String
    },
    ChatStatus: {
        type: String,
    },
    callStatus: {
        type: String,
    },
    videocallstatus: {
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

mongoose.model('astrologer_status', AstrologerStatusSchema);

module.exports = mongoose.model('astrologer_status')
