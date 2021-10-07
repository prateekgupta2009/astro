const mongoose = require('mongoose');

// askQuestion schema 

const pranicHealing_OrderDetailSchema = mongoose.Schema({
    order_id: {
        type: String,
        requried: true,
    },
    user_id:{
        type: String,
        required: true,
    },
    pranic_healer_id: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    gender: {
        type: String
    },
    age_group: {
        type: String,
    },
    marital_status: {
        type: String,

    },
    dob: {
        type: String,
    },
    address: {
        type: String,
    },

    country_id: {
        type: String,
    },
    state_id: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: String,
    },
    occupation: {
        type: String,
    },
    medical_condition: {
        type: String,
    },
    symptoms: {
        type: String,
    },
    charge_price:{
        type: String,
    },
   
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

mongoose.model('pranichealing_order_detail', pranicHealing_OrderDetailSchema);

module.exports = mongoose.model('pranichealing_order_detail')
