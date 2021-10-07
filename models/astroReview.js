const mongoose = require('mongoose');

// ProductOrderSchema schema 

const AstrologrReviewSchema = mongoose.Schema({

    astrologer_id:{
        type:String
    },
    user_id:{
        type:String
    },
    user_first_name:{
        type: String,
    },
    user_last_name:{
        type: String,
    },
    astrologer_name:{
        type: String,
    },
    review: {
        type: String,
    },
    astroReplay:{
        type:String
    },
    starNumber: {
        type: Number,
    },
    time: {
        type: String,
    },
    status:{
        type:String
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

mongoose.model('astrologer_review', AstrologrReviewSchema);

module.exports = mongoose.model('astrologer_review')
