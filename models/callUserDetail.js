const mongoose = require('mongoose');

// askQuestion schema 

const CallUserDetailSchema = mongoose.Schema({

    user_id: {
        type: String,
        required: true,        
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    tob:{
        type:String,
        default:"null"
    },
    address:{
        type:String,
        default:"null"
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    } 
});

// astrologers model

mongoose.model('call_user_detail', CallUserDetailSchema);

module.exports = mongoose.model('call_user_detail')
