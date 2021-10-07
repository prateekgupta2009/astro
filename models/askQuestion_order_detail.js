const mongoose = require('mongoose');

// askQuestion schema 

const AskQuestionnn_OrderDetailSchema = mongoose.Schema({
    user_id:{
        type: String,
        requried: true,
    },
    order_id: {
        type: String,
        requried: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String
    },
    mobile: {
        type: String
    },
    noofquestion: {
        type: String
    },
    question1: {
        type: String
    },
    question2: {
        type: String,
    },
    question3: {
        type: String,

    },
    replayquestion1: {
        type: String,

    },
    replayquestion2: {
        type: String,
    },

    replayquestion3: {
        type: String,
    },
    tob: {
        type: String,
    },
    totalPrice  : {
        type: String,
    },
    gender: {
        type: String,
    },
    dob:{
        type: String,

    },
    birthstate:{
        type:String
    },
    birthplace:{
        type:String
    },
    birthCountry:{
        type:String
    },
    email:{
        type:String
    },
    questionnPrice:{
        type:String
    },
    // regular_price_inr:{
    //     type:String
    // },
    // sell_price_inr:{
    //     type:String
    // },
    // regular_price_usd:{
    //     type:String
    // },
    // sell_price_usd:{
    //     type:String
    // },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

// astrologers model

mongoose.model('askquestion_order_detail', AskQuestionnn_OrderDetailSchema);

module.exports = mongoose.model('askquestion_order_detail')
