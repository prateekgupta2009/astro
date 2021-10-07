const mongoose = require('mongoose');

// userSms  schema

const userSmsOtpSchema = mongoose.Schema({

    otp: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: new Date(),
        expires: '5m'
    },
    // expire_at: {type: Date,
    //      default: Date.now, 
    //      expires: 300
    // } 

});

// userSms model

mongoose.model('userotp', userSmsOtpSchema);

module.exports = mongoose.model('userotp')